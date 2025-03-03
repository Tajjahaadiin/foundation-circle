import CreateThreads from '@/features/home/components/create-thread';
import CardThread from '@/features/home/components/card-thread';
import { Box, Flex, Spinner, Text } from '@chakra-ui/react';
// import { postDatas } from '@/utils/__mock/posts';
import { Thread } from '@/features/thread/dto/thread';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
export default function HomePage() {
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
  return (
    <Box>
      <Box borderBottom={'2px solid'} borderColor={'border'}>
        <Box px={'40px'} pt={'20px'}>
          <Text>Home</Text>
          <CreateThreads />
        </Box>
      </Box>
      {isError && <Text color={'red'}>{failureReason?.message}</Text>}
      {isLoading ? (
        <Box display={'flex'} justifyContent={'center'} paddingY={50}>
          <Spinner />
        </Box>
      ) : (
        <Flex flexDir={'column'} w={'full'}>
          {threads?.map((thread) => (
            <CardThread
              thread={thread}
              key={thread.id}
              borderBottom={'2px solid'}
              borderColor={'border'}
            />
          ))}
        </Flex>
      )}
    </Box>
  );
}
