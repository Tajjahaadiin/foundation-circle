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
import { useLocation } from 'react-router-dom';
import { arrowLeftLogo } from '@/assets/icons';
import { useAuthStore } from '@/stores/authStore';

export default function ProfileInfo(props: FlexProps) {
  const {
    user: {
      username,
      profile: { fullName, avatarUrl },
    },
  } = useAuthStore();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const hasAnyQueryParam = searchParams.toString() !== '';

  console.log('condition', hasAnyQueryParam);
  const buttonText = hasAnyQueryParam ? 'Follow' : 'edit profile';
  const profileText = hasAnyQueryParam ? `✨${fullName}✨` : 'My Profile';

  return (
    <Flex flexDir={'column'} h={'full'} {...props}>
      <Flex alignItems={'center'} mb={'2'}>
        <Button
          variant={'ghost'}
          display={'flex'}
          gap={'4px'}
          color={'secondary'}
        >
          <Image src={arrowLeftLogo} width={'27px'} />
        </Button>
        <Text>{profileText}</Text>
      </Flex>
      <Flex flexDir={'column'}>
        <Box
          position="relative"
          h={'12vh'}
          w={'full'}
          backgroundImage={`url("https://api.dicebear.com/9.x/glass/svg?seed=${fullName}")`}
          alignSelf={'center'}
          rounded={'lg'}
        >
          <Float placement={'bottom-start'} offsetX="10">
            <Avatar
              src={
                avatarUrl ||
                `https://api.dicebear.com/9.x/big-smile/svg?seed=${fullName || ''}`
              }
              size={'xl'}
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

      <Flex flexDir={'column'} gap={'1'}>
        <Text textStyle={'md'}>✨{fullName}✨</Text>
        <Text textStyle={'xs'} color={'text.light'}>
          {username}
        </Text>
        <Text textStyle={'sm'}>I believe i can fly</Text>
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
