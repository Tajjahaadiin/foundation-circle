import { useForm } from 'react-hook-form';
import { loginSchema, LoginSchemaDTO } from '@/utils/schemas/auth.schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { toaster } from '@/components/ui/toaster';
import { useAuthStore } from '@/stores/authStore';
import { api } from '@/lib/api';
import { isAxiosError } from 'axios';
import Cookies from 'js-cookie';
import { useMutation } from '@tanstack/react-query';
import { UserEntity } from '@/entities/user.entity';
import { ProfileEntity } from '@/entities/profile.entity';
import { LoginDTO } from '../types/login';
import { useNavigate } from 'react-router-dom';

type UserProfile = UserEntity & {
  profile: ProfileEntity;
};

interface LoginResponse {
  message: string;
  data: {
    token: string;
    user: UserProfile;
  };
}

export function useLoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginSchemaDTO>({
    mode: 'onChange',
    resolver: zodResolver(loginSchema),
  });

  const { setUser } = useAuthStore();
  const navigate = useNavigate();

  const { isPending, mutateAsync: mutateLogin } = useMutation<
    LoginResponse,
    Error,
    LoginSchemaDTO
  >({
    mutationKey: ['login'],
    mutationFn: async (data: LoginSchemaDTO) => {
      let logIdentifier: LoginDTO;

      if (data.loginId.includes('@')) {
        logIdentifier = {
          email: data.loginId,
          password: data.password,
        };
      } else {
        logIdentifier = {
          username: data.loginId,
          password: data.password,
        };
      }

      const response = await api.post<LoginResponse>(
        '/auth/login',
        logIdentifier
      );
      setUser(response.data.data.user);
      // console.log('data from login', response.data.data.user);
      Cookies.set('token', response.data.data.token, {
        expires: 1,
      });

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

      navigate({ pathname: '/' });
    },
  });

  async function onLogin(data: LoginSchemaDTO) {
    await mutateLogin(data);
    reset();
  }

  return {
    register,
    handleSubmit,
    errors,
    isPending,
    onLogin,
  };
}
