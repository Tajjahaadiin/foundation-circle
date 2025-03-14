import CardThread from '@/features/home/components/card-thread';
import ProfilePage from '@/features/profile/profile';
import { Box, Flex, Spinner, Text } from '@chakra-ui/react';
import { api } from '@/lib/api';
import { Thread } from '@/features/thread/dto/thread';
import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/stores/authStore';
export default function ProfileRoute() {
  const { user } = useAuthStore();
  const userId = user?.id;
  const {
    data: threads,
    isLoading,
    isError,
    failureReason,
  } = useQuery<Thread[]>({
    queryKey: ['threads'],
    queryFn: async () => {
      const response = await api.get('/threads');
      return response.data;
    },
  });
  const userThreads = threads?.filter((thread) => thread.user?.id === userId);
  console.log(userThreads);
  return (
    <Box>
      <ProfilePage />
      {isError && <Text color={'red'}>{failureReason?.message}</Text>}
      {isLoading ? (
        <Box display={'flex'} justifyContent={'center'} paddingY={50}>
          <Spinner />
        </Box>
      ) : (
        <Flex flexDir={'column'}>
          {userThreads?.map((thread) => (
            <CardThread thread={thread} key={thread.id} />
          ))}
        </Flex>
      )}
    </Box>
  );
}
