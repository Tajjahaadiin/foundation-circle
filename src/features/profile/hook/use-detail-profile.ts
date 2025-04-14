import { api } from '@/lib/api';
import { UserProfile } from '@/stores/authStore';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

export default function UseDetailProfile() {
  const { userId } = useParams();
  const { data, isLoading } = useQuery<UserProfile>({
    queryKey: [`users/${userId}`],
    queryFn: async () => {
      const response = await api.get(`users/${userId}`);
      return response.data;
    },
  });
  console.log('data', data);
  const fullName = data?.profile.fullName || '';
  const username = data?.username || '';
  const avatarUrl = data?.profile.avatarUrl || '';
  const bannerUrl = data?.profile.bannerUrl || '';
  const bio = data?.profile.bio || '';
  return {
    fullName,
    username,
    bannerUrl,
    avatarUrl,
    bio,
    isLoading,
  };
}
