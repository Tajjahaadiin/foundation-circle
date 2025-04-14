import { api } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { sugesttion } from '../types/suggestion-user';
export default function UseSuggestion() {
  const { data, isLoading, error, isFetched } = useQuery<sugesttion[]>({
    queryKey: [`suggestion`],
    queryFn: async () => {
      const response = await api.get(`/users/suggest`);
      console.log('response', response);
      return response.data;
    },
  });

  return {
    data,
    isLoading,
    error,
    isFetched,
  };
}
