import { Flex } from '@chakra-ui/react';
import ProfileInfo from './components/profile-info';
import ProfileThread from './components/profile-thread';
export default function ProfilePage() {
  return (
    <Flex flexDir={'column'}>
      <ProfileInfo />
      <ProfileThread />
    </Flex>
  );
}
