import CardReply from '@/features/home/components/card-reply';
import CardThreadDetail from '@/features/home/components/card-thread-detail';
import CreateReply from '@/features/home/components/create-reply';
import { Thread } from '@/features/thread/types/thread';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Box, Spinner } from '@chakra-ui/react';
// import { useNavigate } from 'react-router-dom';

interface detailId {
  threadId: string;
}
export default function ThreadDetail(detailId: detailId) {
  const { threadId } = detailId;
  // const { threadId } = useParams();
  console.log(threadId);
  const { data, isLoading } = useQuery<Thread>({
    queryKey: [`threads/${threadId}`],
    queryFn: async () => {
      const response = await api.get(`threads/${threadId}`);
      return response.data;
    },
  });

  return (
    <Box>
      {isLoading ? (
        <Box display={'flex'} justifyContent={'center'} py={50}>
          <Spinner />
        </Box>
      ) : (
        <>
          {data && (
            <>
              <Box borderBottom={'1px solid'} borderColor={'bdr'}>
                <CardThreadDetail {...data} />
              </Box>
              <Box px={'10'}>
                <CreateReply />
              </Box>
              {data?.replies?.map((reply) => <CardReply {...reply} />)}
            </>
          )}
        </>
      )}
    </Box>
  );
}
