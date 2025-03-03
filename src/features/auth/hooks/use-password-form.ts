import { toaster } from '@/components/ui/toaster';
import { api } from '@/lib/api';
import {
  resetPasswordSchema,
  ResetPasswordSchemaDTO,
} from '@/utils/schemas/auth.schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';

interface ResetPasswordResponse {
  message: string;
  data: {
    id: string;
    email: string;
  };
}

export function usePasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ResetPasswordSchemaDTO>({
    mode: 'all',
    resolver: zodResolver(resetPasswordSchema),
  });
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');

  const { isPending, mutateAsync } = useMutation<
    ResetPasswordResponse,
    Error,
    ResetPasswordSchemaDTO
  >({
    mutationKey: ['reset-password'],
    mutationFn: async ({
      newPassword,
      confirmPassword,
    }: ResetPasswordSchemaDTO) => {
      const response = await api.post<ResetPasswordResponse>(
        '/auth/reset-password',
        {
          newPassword,
          confirmPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
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

  async function onSubmit(data: ResetPasswordSchemaDTO) {
    await mutateAsync(data);
    reset();
  }

  return {
    register,
    onSubmit,
    isPending,
    handleSubmit,
    errors,
  };
}
