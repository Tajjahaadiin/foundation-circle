import { Avatar } from '@/components/ui/avatar';
import {
  Box,
  Button,
  Flex,
  FlexProps,
  Float,
  Text,
  Image,
} from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { arrowLeftLogo } from '@/assets/icons';
import { useAuthStore } from '@/stores/authStore';
import { UpdateProfileButton } from './profile-update';

export default function ProfileInfo(props: FlexProps) {
  const { user } = useAuthStore();

  const fullName = user?.profile?.fullName;
  const username = user?.username;
  const avatarUrl = user?.profile?.avatarUrl;
  const bannerUrl = user?.profile.bannerUrl;
  const bio = user?.profile.bio;
  const followerscount = user?.followersCount;
  const followingCount = user?.followingCount;
  const navigate = useNavigate();
  console.log('userData', user);
  console.log('fullname', user?.profile?.fullName);
  const { userId } = useParams();

  const hasAnyQueryParam = userId !== undefined;
  console.log('condition', hasAnyQueryParam);
  // const buttonText = hasAnyQueryParam ? 'Follow' : 'edit profile';
  const profileText = hasAnyQueryParam ? `${fullName}` : 'My Profile';
  function backHome() {
    navigate('/');
  }
  return (
    <Flex flexDir={'column'} h={'full'} {...props}>
      <Flex alignItems={'center'} mb={'2'}>
        <Button
          variant={'ghost'}
          display={'flex'}
          gap={'4px'}
          _hover={{ bg: 'initial' }}
          color={'secondary'}
          onClick={backHome}
        >
          <Image src={arrowLeftLogo} width={'27px'} />
        </Button>
        <Text color={'white'}>{profileText}</Text>
      </Flex>
      <Flex flexDir={'column'} px={'6'} w={'full'}>
        <Box
          position="relative"
          h={'12vh'}
          w={'full'}
          bg={'white'}
          // backgroundImage={bannerUrl ?? ''}
          alignSelf={'center'}
          rounded={'lg'}
        >
          <Flex w={'full'} maxH={'70px'} rounded={'lg'}>
            <Image
              src={bannerUrl ?? ''}
              rounded={'lg'}
              objectFit={'cover'}
              objectPosition={'center'}
            />
          </Flex>
          <Float placement={'bottom-start'} offsetX="10">
            <Avatar
              name={fullName || ''}
              src={avatarUrl ?? ''}
              shape="full"
              size="full"
              width={'50px'}
              height={'50px'}
            />
          </Float>
        </Box>

        <Flex alignSelf={'end'} mt={'2'}>
          <UpdateProfileButton />
        </Flex>
      </Flex>

      <Flex flexDir={'column'} gap={'1'} px={'6'}>
        <Text textStyle={'md'} color={'white'}>
          {fullName}
        </Text>
        <Text textStyle={'xs'} color={'text.light'}>
          @{username}
        </Text>
        <Text textStyle={'sm'}>{bio || ''}</Text>
        <Flex gap={'2'} textStyle={'sm'} w={'full'}>
          <Text textStyle={'sm'} color={'text.light'}>
            {followerscount} Followers
          </Text>
          <Text textStyle={'sm'} color={'text.light'}>
            {followingCount} Following
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}
