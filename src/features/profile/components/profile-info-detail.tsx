import { Avatar } from '@/components/ui/avatar';
import {
  Box,
  Button,
  Flex,
  FlexProps,
  Float,
  Text,
  Image,
  Spinner,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { arrowLeftLogo } from '@/assets/icons';
import UseDetailProfile from '../hook/use-detail-profile';

export default function ProfileInfoDetail(props: FlexProps) {
  const navigate = useNavigate();
  const { fullName, username, avatarUrl, bannerUrl, bio, isLoading } =
    UseDetailProfile();
  function backHome() {
    navigate('/');
  }
  return (
    <>
      {isLoading ? (
        <Box display={'flex'} justifyContent={'center'} py={50}>
          <Spinner />
        </Box>
      ) : (
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
            <Text color={'white'}>{fullName}</Text>
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
              follow
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
      )}
    </>
  );
}
