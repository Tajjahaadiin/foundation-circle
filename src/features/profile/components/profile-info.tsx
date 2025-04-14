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

export default function ProfileInfo(props: FlexProps) {
  const { user } = useAuthStore();

  const fullName = user?.profile?.fullName;
  const username = user?.username;
  const avatarUrl = user?.profile?.avatarUrl;
  const bannerUrl = user?.profile.bannerUrl;
  const bio = user?.profile.bio;
  const navigate = useNavigate();
  console.log('userData', user);
  console.log('fullname', user?.profile?.fullName);
  const { userId } = useParams();

  const hasAnyQueryParam = userId !== undefined;
  console.log('condition', hasAnyQueryParam);
  const buttonText = hasAnyQueryParam ? 'Follow' : 'edit profile';
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
      <Flex flexDir={'column'} px={'6'}>
        <Box
          position="relative"
          h={'12vh'}
          w={'full'}
          bg={'white'}
          backgroundImage={bannerUrl ?? ''}
          alignSelf={'center'}
          rounded={'lg'}
        >
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
        <Button
          w={'7vw'}
          h={'5vh'}
          mt={'2'}
          alignSelf={'end'}
          bg={'none'}
          color={'white'}
          borderWidth={'1px'}
          borderColor={'white'}
          rounded={'full'}
          alignItems={'center'}
        >
          {buttonText}
        </Button>
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
            200 Followers
          </Text>
          <Text textStyle={'sm'} color={'text.light'}>
            10 Following
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}
