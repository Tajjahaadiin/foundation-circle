import { toaster } from '@/components/ui/toaster';
import { api } from '@/lib/api';
import { useAuthStore } from '@/stores/authStore';
import {
  ProfileUpdateSchemaDTO,
  updateProfileSchema,
} from '@/utils/schemas/profile.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

interface UpdateResponse {
  message: string;
  data: {
    fullName: string;
    username: string;
    bio: string;
    avatarUrl: string;
  };
}
export default function useUpdateProfile() {
  const { user } = useAuthStore();
  const queryClient = useQueryClient();
  const inputFileRef = useRef<HTMLInputElement | null>(null);
  const [previewURL, setPreviewURL] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProfileUpdateSchemaDTO>({
    mode: 'onChange',
    defaultValues: {
      fullName: user?.profile.fullName ?? '',
      username: user?.username ?? '',
      bio: user?.profile.bio ?? '',
    },
    resolver: zodResolver(updateProfileSchema),
  });
  const {
    ref: registerImagesRef,
    onChange: registerImagesOnChange,
    ...restRegisterImages
  } = register('avatarUrl');
  // const navigate = useNavigate();
  const { isPending, mutateAsync: mutateUpdateProfile } = useMutation<
    UpdateResponse,
    Error,
    ProfileUpdateSchemaDTO
  >({
    mutationKey: ['update-profile'],
    mutationFn: async (data: ProfileUpdateSchemaDTO) => {
      // const { username, ...rest } = data;
      // const lowercaseUsername = username.toLowerCase();
      const formData = new FormData();
      formData.append('fullName', data.fullName);
      formData.append('username', data.username.toLowerCase());
      formData.append('bio', data.bio);
      if (data.avatarUrl) {
        formData.append('avatarUrl', data.avatarUrl[0]); // Access the first file in the array
      }
      // const registerData = { username: lowercaseUsername, ...rest };
      // console.log('username', lowercaseUsername);
      const response = await api.post<UpdateResponse>('/profile', formData);
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
      await queryClient.invalidateQueries({
        queryKey: ['threads'],
      });
      await queryClient.invalidateQueries({
        queryKey: ['check-auth'],
      });
      clearForm();
      // navigate({ pathname: '/' });
      window.location.pathname = '/';
    },
  });
  const onSubmit = async (data: ProfileUpdateSchemaDTO) => {
    await mutateUpdateProfile(data);

    console.log(data, 'this is data');
    console.log('avatar', data.avatarUrl);
  };
  const handleGalleryAddClick = () => {
    inputFileRef.current?.click();
  };
  function handlePreview(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setPreviewURL(url);
    }
  }
  function clearForm() {
    reset();
    setPreviewURL('');
  }
  return {
    register,
    previewURL,
    handleSubmit,
    errors,
    onSubmit,
    isPending,
    handlePreview,
    handleGalleryAddClick,
    registerImagesRef,
    restRegisterImages,
    registerImagesOnChange,
    inputFileRef,
  };
}
