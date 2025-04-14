import { Avatar } from '@/components/ui/avatar';
import { Button, Flex, Text, FlexProps } from '@chakra-ui/react';
import { Followers } from '../types/followers';
import useFollow from '@/features/follow/hooks/use-follow';
import UseUnFollows from '../hooks/use-unfollow';

interface FollowersProps extends FlexProps {
  follower: Followers;
}

export default function FollowersCard({ follower, ...props }: FollowersProps) {
  const { isPending: isPendingFollow, onFollow } = useFollow();
  const { isPending: isPendingUnFollow, onUnFollow } = UseUnFollows();

  console.log(`followedID`, follower.id);
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
          name={follower.profile.fullName || ''}
          src={follower.profile.avatarUrl || ''}
          shape="full"
          size="full"
          width={'50px'}
          height={'50px'}
        />

        <Flex display={'flex'} flexDirection={'column'} gap={'4px'} flex={'10'}>
          <Text fontWeight={'bold'} color={'white'}>
            {follower.profile.fullName}
          </Text>
          <Text color={'text.light'}>@{follower.username}</Text>
          <Text>{follower.profile.bio || ''}</Text>
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
          disabled={isPendingFollow || isPendingUnFollow}
          onClick={() =>
            follower.isFollowing
              ? onUnFollow({ followedId: follower.id })
              : onFollow({ followedId: follower.id })
          }
        >
          <Text textStyle={'xs'} color={'white'}>
            {follower.isFollowing ? 'Unfollow' : 'Follow Back'}
          </Text>
        </Button>
      </Flex>
    </Flex>
  );
}
