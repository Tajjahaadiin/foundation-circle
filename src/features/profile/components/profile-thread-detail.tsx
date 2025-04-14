import { Thread } from '@/features/thread/dto/thread';
import { api } from '@/lib/api';
import { Box, Text, Spinner, Flex } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import CardThread from '@/features/home/components/card-thread';
import { useParams } from 'react-router-dom';

export default function ProfileThreadDetail() {
  const { userId } = useParams();

  const {
    data: threads,
    isLoading,
    isError,
    failureReason,
  } = useQuery<Thread[]>({
    queryKey: ['threads'],
    queryFn: async () => {
      const response = await api.get(`/threads/profile/${userId}`);
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
        <Flex flexDir={'column'}>
          {threads?.map((thread) => (
            <CardThread thread={thread} key={thread.id} />
          ))}
        </Flex>
      )}
    </Box>
  );
}
