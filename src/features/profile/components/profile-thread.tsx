import { Thread } from '@/features/thread/dto/thread';
import { api } from '@/lib/api';
import { useAuthStore } from '@/stores/authStore';
import { Box, Text, Spinner, Flex } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import CardThread from '@/features/home/components/card-thread';

export default function ProfileThread() {
  const { user } = useAuthStore();

  const {
    data: threads,
    isLoading,
    isError,
    failureReason,
  } = useQuery<Thread[]>({
    queryKey: ['threads'],
    queryFn: async () => {
      const response = await api.get(`/threads/profile/${user?.id}`);
      return response.data;
    },
  });
  return (
    <Box>
      {isError && <Text color={'red'}>{failureReason?.message}</Text>}
      {isLoading ? (
        <Box display={'flex'} justifyContent={'center'} paddingY={50}>
          <Spinner />
        </Box>
      ) : (
        <Flex flexDir={'column'} mt={'2'}>
          {threads?.map((thread) => (
            <Box
              // borderBottom={'solid'}
              borderColor={'bdr'}
              borderWidth={'1px'}
              // borderBlockEnd={'1px solid'}
            >
              <CardThread thread={thread} key={thread.id} />
            </Box>
          ))}
        </Flex>
      )}
    </Box>
  );
}
