import { Avatar } from '@/components/ui/avatar';
import { Box, BoxProps, Button, Text } from '@chakra-ui/react';
import { sugesttion } from '../types/suggestion-user';
import useFollow from '@/features/follow/hooks/use-follow';
import UseUnFollows from '@/features/follow/hooks/use-unfollow';

interface suggestionCardProps extends BoxProps {
  suggestion: sugesttion;
}

export default function SuggestionUserCard({
  suggestion,
  ...props
}: suggestionCardProps) {
  const { isPending: isPendingFollow, onFollow } = useFollow();
  const { isPending: isPendingUnFollow, onUnFollow } = UseUnFollows();
  return (
    <Box
      p={'2'}
      display={'flex'}
      // gap={'16px'}
      spaceY={'1'}
      spaceX={'1'}
      borderBottom={'1px solid'}
      borderColor={'bdr'}
      {...props}
    >
      <Avatar
        name={suggestion.profile.fullName || ''}
        src={suggestion.profile.avatarUrl || ''}
        shape="full"
        size="xs"
      />

      <Box display={'flex'} flexDirection={'column'} gap={'1'} flex={'10'}>
        <Text fontWeight={'bold'} color={'white'} textStyle={'xs'}>
          {suggestion.profile.fullName}
        </Text>
        <Text color={'text.light'} textStyle={'2xs'}>
          @{suggestion.username}
        </Text>
      </Box>
      <Button
        variant={'outline'}
        alignSelf={'end'}
        bg={'none'}
        maxH={'7'}
        color={'white'}
        borderWidth={'1px'}
        borderColor={'white'}
        rounded={'3xl'}
        alignItems={'center'}
        flex={'2'}
        disabled={isPendingFollow || isPendingUnFollow}
        onClick={() =>
          suggestion.isFollowing
            ? onUnFollow({ followedId: suggestion.id })
            : onFollow({ followedId: suggestion.id })
        }
      >
        <Text textStyle={'2xs'} color={'white'}>
          {suggestion.isFollowing ? 'Unfollow' : 'Follow'}
        </Text>
      </Button>
    </Box>
  );
}
