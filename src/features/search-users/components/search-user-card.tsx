import { Avatar } from '@/components/ui/avatar';
import { Box, BoxProps, Button, Text } from '@chakra-ui/react';
import { SearchUser } from '../types/search-user';
import useFollow from '@/features/follow/hooks/use-follow';
import UseUnFollows from '@/features/follow/hooks/use-unfollow';

interface SearchUserCardProps extends BoxProps {
  searchUserData: SearchUser;
}

export default function SearchUserCard({
  searchUserData,
  ...props
}: SearchUserCardProps) {
  const { isPending: isPendingFollow, onFollow } = useFollow();
  const { isPending: isPendingUnFollow, onUnFollow } = UseUnFollows();
  return (
    <Box
      p={'20px'}
      display={'flex'}
      gap={'16px'}
      borderBottom={'3px solid'}
      borderColor={'bdr'}
      {...props}
    >
      <Avatar
        name={searchUserData.profile.fullName || ''}
        src={searchUserData.profile.avatarUrl || ''}
        shape="full"
        size="full"
        width={'50px'}
        height={'50px'}
      />

      <Box display={'flex'} flexDirection={'column'} gap={'4px'} flex={'10'}>
        <Text fontWeight={'bold'} color={'white'}>
          {searchUserData.profile.fullName}
        </Text>
        <Text color={'text.light'}>@{searchUserData.username}</Text>
        <Text>{searchUserData.profile.bio || ''}</Text>
      </Box>
      <Button
        variant={'outline'}
        alignSelf={'end'}
        bg={'none'}
        color={'white'}
        borderWidth={'1px'}
        borderColor={'white'}
        rounded={'full'}
        alignItems={'center'}
        flex={'3'}
        disabled={isPendingFollow || isPendingUnFollow}
        onClick={() =>
          searchUserData.isFollowing
            ? onUnFollow({ followedId: searchUserData.id })
            : onFollow({ followedId: searchUserData.id })
        }
      >
        <Text textStyle={'xs'} color={'white'}>
          {searchUserData.isFollowing ? 'Unfollow' : 'Follow'}
        </Text>
      </Button>
    </Box>
  );
}
