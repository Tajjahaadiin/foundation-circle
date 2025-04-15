import { toaster } from '@/components/ui/toaster';
import { ThreadResponse } from '@/features/thread/dto/thread';
import { api } from '@/lib/api';
import { useAuthStore } from '@/stores/authStore';
import {
  updateThreadSchema,
  UpdateThreadSchemaDTO,
} from '@/utils/schemas/thread.schema';
import { zodResolver } from '@hookform/resolvers/zod';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
// import { boolean } from 'zod';

export function useUpdateThread(
  dialog: React.Dispatch<React.SetStateAction<boolean>>
) {
  const { user } = useAuthStore();
  const fullName = user?.profile?.fullName;
  const avatarUrl = user?.profile?.avatarUrl;
  const [previewURL, setPreviewURL] = useState<string | null>(null);
  const inputFileRef = useRef<HTMLInputElement | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UpdateThreadSchemaDTO>({
    mode: 'onChange',
    resolver: zodResolver(updateThreadSchema),
  });
  const {
    ref: registerImagesRef,
    onChange: registerImagesOnChange,
    ...restRegisterImages
  } = register('images');

  const queryClient = useQueryClient();
  function onClickFile() {
    inputFileRef?.current?.click();
  }
  const { isPending, mutateAsync } = useMutation<
    ThreadResponse,
    Error,
    UpdateThreadSchemaDTO
  >({
    mutationKey: ['update-thread'],
    mutationFn: async (data: UpdateThreadSchemaDTO) => {
      const formData = new FormData();
      formData.append('content', data.content);
      if (data.images) {
        formData.append('images', data.images[0]);
      }
      console.log('images', data.images);
      const response = await api.post<ThreadResponse>(
        `/threads/${data.threadId}`,
        formData
      );
      return response.data;
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        return toaster.create({
          title: error.response?.data.errors[0].message,
          type: 'error',
        });
      }

      toaster.create({
        title: 'Something went wrong!',
        type: 'error',
      });
    },
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: ['threads'],
      });
      await queryClient.invalidateQueries({
        queryKey: [`threads/${data.data.id}`],
      });

      toaster.create({
        title: data.message,
        type: 'success',
        description: 'update Success',
      });
      dialog(false);
    },
  });
  async function onSubmit(data: UpdateThreadSchemaDTO) {
    await mutateAsync(data);
    clearForm();
  }
  function clearForm() {
    reset();
    setPreviewURL('');
  }
  function handlePreview(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setPreviewURL(url);
    }
  }
  return {
    fullName,
    avatarUrl,
    previewURL,
    setPreviewURL,
    inputFileRef,
    register,
    handleSubmit,
    errors,
    registerImagesRef,
    registerImagesOnChange,
    restRegisterImages,
    isPending,
    onSubmit,
    onClickFile,
    handlePreview,
    clearForm,
  };
}
