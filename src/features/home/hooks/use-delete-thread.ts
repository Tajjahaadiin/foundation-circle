import { toaster } from '@/components/ui/toaster';
import { api } from '@/lib/api';
// import { useAuthStore } from '@/stores/authStore';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';

export function useDeleteThread() {
  const queryClient = useQueryClient();
  const { isPending, mutateAsync } = useMutation({
    mutationKey: ['delete-thread'],
    mutationFn: async (threaId: string) => {
      const response = await api.delete(`/threads/${threaId}`);
      return response.data;
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        return toaster.create({
          title: error.response?.data.message,
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

      toaster.create({
        title: data.message,
        type: 'success',
      });
    },
  });
  async function onSubmit(threadId: string) {
    await mutateAsync(threadId);
  }

  return {
    isPending,
    onSubmit,
  };
}
