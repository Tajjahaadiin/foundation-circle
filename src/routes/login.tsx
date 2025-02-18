import LoginForm from '@/features/auth/components/login-form';
import { Container } from '@chakra-ui/react';
export default function LoginRoute() {
  return (
    <Container maxW="md" mt="128px">
      <LoginForm />
    </Container>
  );
}
