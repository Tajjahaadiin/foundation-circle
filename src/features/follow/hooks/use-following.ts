import { api } from '@/lib/api';
import { useAuthStore } from '@/stores/authStore';
import { useQuery } from '@tanstack/react-query';
import { Following } from '../types/follwing';

export default function UseFollowing() {
  const { user } = useAuthStore();
  const userId = user?.id;
  if (!userId) {
    throw new Error('user not found');
  }

  const { data, isLoading, error } = useQuery<Following[]>({
    queryKey: [`following`],
    queryFn: async () => {
      const response = await api.get(`/follows/following/${userId}`);
      return response.data.data;
    },
    enabled: !!userId,
  });
  return {
    data,
    isLoading,
    error,
  };
}
