import { toaster } from '@/components/ui/toaster';
import { api } from '@/lib/api';
import {
  forgotPasswordSchema,
  ForgotPasswordSchemaDTO,
} from '@/utils/schemas/auth.schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

export function useForgotPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordSchemaDTO>({
    mode: 'onChange',
    resolver: zodResolver(forgotPasswordSchema),
  });
  const navigate = useNavigate();
  const { isPending, mutateAsync } = useMutation<
    { message: string },
    AxiosError,
    ForgotPasswordSchemaDTO
  >({
    mutationKey: ['forgot-password'],
    mutationFn: async ({ email }: ForgotPasswordSchemaDTO) => {
      const response = await api.post('/auth/forgot-password', { email });
      return response.data;
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        return toaster.create({
          title: (error.response?.data as { message: string }).message,
          type: 'error',
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
      navigate({ pathname: 'login' });
    },
  });

  async function onSubmit(data: ForgotPasswordSchemaDTO) {
    await mutateAsync(data);
  }

  return {
    register,
    onSubmit,
    handleSubmit,
    errors,
    isPending,
  };
}
