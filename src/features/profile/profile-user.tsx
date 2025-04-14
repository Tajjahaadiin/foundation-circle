import { Flex } from '@chakra-ui/react';
import ProfileInfoDetail from './components/profile-info-detail';
import ProfileThreadDetail from './components/profile-thread-detail';
export default function ProfileUserPage() {
  return (
    <Flex flexDir={'column'}>
      <ProfileInfoDetail />
      <ProfileThreadDetail />
    </Flex>
  );
}
