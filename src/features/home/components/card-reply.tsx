import { Avatar } from '@/components/ui/avatar';
import { ReplyEntity } from '@/entities/reply.entity';
import { getRelativeTime } from '@/utils/time-utils';
import { Box, Text } from '@chakra-ui/react';

export default function CardReply(reply: ReplyEntity) {
  console.log('this is reply', reply);
  return (
    <Box
      display={'flex'}
      gap={'16px'}
      borderBlock={'1px solid'}
      borderColor={'bdr'}
      py={'5'}
      px={'10'}
    >
      <Avatar
        name={reply.user?.profile?.fullName || ''}
        src={reply.user?.profile?.avatarUrl || ''}
        shape="full"
        size="full"
        width={'50px'}
        height={'50px'}
      />

      <Box display={'flex'} flexDirection={'column'} gap={'4px'}>
        <Box display={'flex'} gap={'4px'}>
          <Text fontWeight={'bold'} color={'white'}>
            {reply.user?.profile?.fullName}
          </Text>
          <Text color={'text.light'}>@{reply.user?.username}</Text>
          <Text color={'text.light'}>•</Text>
          <Text color={'text.light'}>{getRelativeTime(reply.createdAt)}</Text>
        </Box>
        <Text color={'white'}>{reply.content}</Text>
      </Box>
    </Box>
  );
}
