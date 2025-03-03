import { Avatar } from '@/components/ui/avatar';
import { Box, BoxProps, Button, Text } from '@chakra-ui/react';
import { SearchUser } from '../types/search-user';

interface SearchUserCardProps extends BoxProps {
  searchUserData: SearchUser;
}

export default function SearchUserCard({
  searchUserData,
  ...props
}: SearchUserCardProps) {
  return (
    <Box
      p={'20px'}
      display={'flex'}
      gap={'16px'}
      borderBottom={'3px solid'}
      borderColor={'border'}
      {...props}
    >
      <Avatar
        name={searchUserData.profile.fullName || ''}
        src={
          searchUserData.profile.avatarUrl ||
          `https://api.dicebear.com/9.x/big-smile/svg?seed=${searchUserData.profile.fullName || ''}`
        }
        shape="full"
        size="full"
        width={'50px'}
        height={'50px'}
      />

      <Box display={'flex'} flexDirection={'column'} gap={'4px'} flex={'10'}>
        <Text fontWeight={'bold'}>{searchUserData.profile.fullName}</Text>
        <Text color={'secondary'}>@{searchUserData.username}</Text>
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
        flex={'1'}
        onClick={() => {
          // searchUserData.isFollowed = !searchUserData.isFollowed;
          // forceUpdate();
        }}
      >
        Follow
        {/* {searchUserData.isFollowed ? 'Unfollow' : 'Follow'} */}
      </Button>
    </Box>
  );
}
