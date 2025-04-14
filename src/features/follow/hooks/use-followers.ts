import { api } from '@/lib/api';
import { useAuthStore } from '@/stores/authStore';
import { useQuery } from '@tanstack/react-query';
import { Followers } from '../types/followers';

export default function UseFollowers() {
  const { user } = useAuthStore();
  const userId = user?.id;
  if (!userId) {
    throw new Error('user not found');
  }

  const { data, isLoading, error } = useQuery<Followers[]>({
    queryKey: [`followers`],
    queryFn: async () => {
      const response = await api.get(`/follows/followers/${userId}`);
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
