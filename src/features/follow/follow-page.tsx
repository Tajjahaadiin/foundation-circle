import { Box, Flex, Tabs, Spinner, Text } from '@chakra-ui/react';
import FollowersCard from './component/followers-card';
import UseFollowers from './hooks/use-followers';
import UseFollowing from './hooks/use-following';
import FollowingCard from './component/following-card';

const FollowPage = () => {
  const {
    data: followersData,
    isLoading: loadingFollowers,
    error: followersError,
  } = UseFollowers();
  const {
    data: followingData,
    isLoading: loadingFollowing,
    error: followingError,
  } = UseFollowing();
  const followers = followersData;
  const followings = followingData;
  const items = [
    {
      title: 'Followers',
      content: (
        <>
          {loadingFollowers ? (
            <Box display={'flex'} justifyContent={'center'} paddingY={50}>
              <Spinner />
            </Box>
          ) : followersError ? (
            <Box paddingY={50}>
              <Text color="red.500">Error loading followers.</Text>
            </Box>
          ) : followers && followers.length > 0 ? (
            followers.map((follower) => (
              <FollowersCard key={follower.id} follower={follower} w={'full'} />
            ))
          ) : (
            <Box paddingY={50}>
              <Text color="gray.500" textAlign={'center'}>
                No followers yet.
              </Text>
            </Box>
          )}
        </>
      ),
    },
    {
      title: 'Followings',
      content: (
        <>
          {loadingFollowing ? (
            <Box display={'flex'} justifyContent={'center'} paddingY={50}>
              <Spinner />
            </Box>
          ) : followingError ? (
            <Box paddingY={50}>
              <Text color="red.500">Error loading followers.</Text>
            </Box>
          ) : followings && followings.length > 0 ? (
            followings.map((following) => (
              <FollowingCard
                key={following.id}
                following={following}
                w={'full'}
              />
            ))
          ) : (
            <Box paddingY={50}>
              <Text color="gray.500" textAlign={'center'}>
                No followers yet.
              </Text>
            </Box>
          )}
        </>
      ),
    },
  ];

  return (
    <Flex minH="dvh" px={'5'}>
      <Tabs.Root defaultValue="Followers" width="full" colorPalette={'green'}>
        <Tabs.List>
          {items.map((item, index) => (
            <Tabs.Trigger
              key={index}
              value={item.title}
              color={'white'}
              flexBasis={'50%'}
              justifyContent={'center'}
            >
              {item.title}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
        <Box pos="relative" minH="200px" width="full">
          {items.map((item, index) => (
            <Tabs.Content
              key={index}
              value={item.title}
              position="absolute"
              inset="0"
              color={'white'}
              _open={{
                animationName: 'fade-in, scale-in',
                animationDuration: '300ms',
              }}
              _closed={{
                animationName: 'fade-out, scale-out',
                animationDuration: '120ms',
              }}
            >
              {item.content}
            </Tabs.Content>
          ))}
        </Box>
      </Tabs.Root>
    </Flex>
  );
};
export default FollowPage;
