import { api } from '@/lib/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toaster } from '@/components/ui/toaster';
import { isAxiosError } from 'axios';
import { CreateFollowSchemaDTO } from '@/utils/schemas/follow.schema';
import { FollowResponse } from '../dto/follow';
import { useAuthStore } from '@/stores/authStore';

export default function useFollows() {
  const { user } = useAuthStore();
  const userId = user?.id;
  if (!userId) {
    throw new Error('user not found');
  }
  const queryClient = useQueryClient();
  const { isPending, mutateAsync } = useMutation<
    FollowResponse,
    Error,
    CreateFollowSchemaDTO
  >({
    mutationKey: ['follow'],
    mutationFn: async (data: CreateFollowSchemaDTO) => {
      console.log('followedIDDTO', data);
      const response = await api.post<FollowResponse>('/follows', data);
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
    onSuccess: async () => {
      Promise.all([
        await queryClient.invalidateQueries({
          queryKey: [`followers`],
        }),
        await queryClient.invalidateQueries({
          queryKey: [`following`],
        }),
        await queryClient.invalidateQueries({
          queryKey: [`check-auth`],
        }),
        await queryClient.invalidateQueries({
          queryKey: ['search-users'],
        }),
        await queryClient.invalidateQueries({
          queryKey: ['suggestion'],
        }),
      ]);
    },
  });

  async function onFollow(data: CreateFollowSchemaDTO) {
    await mutateAsync(data);
  }

  return {
    isPending,
    onFollow,
  };
}
