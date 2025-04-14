import { Avatar } from '@/components/ui/avatar';
import { Button, Flex, Text, FlexProps } from '@chakra-ui/react';
import { Following } from '../types/follwing';
import UseUnFollows from '../hooks/use-unfollow';

interface followingsProps extends FlexProps {
  following: Following;
}
export default function followingsCard({
  following,
  ...props
}: followingsProps) {
  const { isPending: isPendingUnFollow, onUnFollow } = UseUnFollows();
  return (
    <Flex {...props}>
      <Flex
        w={'full'}
        p={'20px'}
        display={'flex'}
        gap={'16px'}
        borderBottom={'3px solid'}
        borderColor={'bdr'}
      >
        <Avatar
          name={following.profile.fullName || ''}
          src={following.profile.avatarUrl || ''}
          shape="full"
          size="full"
          width={'50px'}
          height={'50px'}
        />

        <Flex display={'flex'} flexDirection={'column'} gap={'4px'} flex={'10'}>
          <Text fontWeight={'bold'} color={'white'}>
            {following.profile.fullName}
          </Text>
          <Text color={'text.light'}>@{following.username}</Text>
          {/* <Text>{following.profile.bio || ''}</Text> */}
        </Flex>
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
          disabled={isPendingUnFollow}
          onClick={() => onUnFollow({ followedId: following.id })}
        >
          <Text textStyle={'xs'}>Unfollow</Text>
          {/* {searchUserData.isFollowed ? 'Unfollow' : 'Follow'} */}
        </Button>
      </Flex>
    </Flex>
  );
}
