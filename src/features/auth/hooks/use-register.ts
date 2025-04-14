import { useForm } from 'react-hook-form';
import {
  registerSchema,
  RegisterSchemaDTO,
} from '@/utils/schemas/auth.schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { api } from '@/lib/api';
import { toaster } from '@/components/ui/toaster';
import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';

interface RegisterResponse {
  message: string;
  data: {
    fullName: string;
    username: string;
    email: string;
    password: string;
  };
}
export default function useRegister() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchemaDTO>({
    mode: 'onChange',
    resolver: zodResolver(registerSchema),
  });
  const navigate = useNavigate();
  const { isPending, mutateAsync: mutateRegister } = useMutation<
    RegisterResponse,
    Error,
    RegisterSchemaDTO
  >({
    mutationKey: ['register'],
    mutationFn: async (data: RegisterSchemaDTO) => {
      const { username, ...rest } = data;
      const lowercaseUsername = username.toLowerCase();
      const registerData = { username: lowercaseUsername, ...rest };
      console.log('username', lowercaseUsername);
      const response = await api.post<RegisterResponse>(
        '/auth/register',
        registerData
      );
      return response.data;
    },
    onError: (error) => {
      console.log(error);
      if (isAxiosError(error)) {
        return toaster.create({
          title: error.message,
          description: error.response?.data.message,
          type: 'error',
          duration: 5000,
        });
      }

      toaster.create({
        title: 'Something went wrong!',
        type: 'error',
      });
    },
    onSuccess: async (data) => {
      toaster.create({
        title: data.message,
        type: 'success',
      });

      navigate({ pathname: '/login' });
    },
  });
  const onSubmit = async (data: RegisterSchemaDTO) => {
    await mutateRegister(data);
  };
  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    isPending,
  };
}
