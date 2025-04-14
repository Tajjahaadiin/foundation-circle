import { arrowLeftLogo } from '@/assets/icons';
import FollowPage from '@/features/follow/follow-page';
import { Button, Flex, Text, Image } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export default function FollowRoute() {
  const navigate = useNavigate();
  function backHome() {
    navigate('/');
  }
  return (
    <Flex p={'16px 0'} flexDir={'column'}>
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
        <Text color={'white'}>Follow</Text>
      </Flex>
      <FollowPage />
    </Flex>
  );
}
