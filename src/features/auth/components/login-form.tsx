import {
  Box,
  Field,
  Input,
  Stack,
  HStack,
  Button,
  Image,
  Container,
  Text,
} from '@chakra-ui/react';
import { Form, Link } from 'react-router';
import circleLogo from '@/assets/logo.svg';
import { floatingStyles } from '@/lib/theme';
export default function LoginForm() {
  return (
    <Container maxW="md" mt="128px">
      <Box my="20px">
        <Image src={circleLogo} mb="20px"></Image>
        <Box fontSize={{ base: '28px' }} fontWeight={'700'} color={'#FFFFFF'}>
          Login to Circle
        </Box>
      </Box>
      <Form>
        <Stack w="full" gap="4">
          <Field.Root required>
            <Box pos="relative" w="full">
              <Input className="peer" placeholder="" />
              <Field.Label css={floatingStyles}>
                Email/Username <Field.RequiredIndicator />
              </Field.Label>
            </Box>
          </Field.Root>
          <Field.Root required>
            <Box pos="relative" w="full">
              <Input
                className="peer"
                placeholder=""
                borderRadius="8"
                type="password"
                name="password"
              />
              <Field.Label css={floatingStyles}>
                Password <Field.RequiredIndicator />
              </Field.Label>
            </Box>
          </Field.Root>
          <Box w="full" display="flex" justifyContent="flex-end">
            <Button asChild variant="plain">
              <Link to={'/forgot-password'}>Forgot Password?</Link>
            </Button>
          </Box>
        </Stack>
      </Form>

      <Box justifyContent="flex-end" w="full">
        <Button
          variant="solid"
          w="full"
          role="submit"
          borderRadius="full"
          bg={'brand.solid'}
        >
          Login
        </Button>
      </Box>
      <HStack fontSize={{ base: '14px' }} direction={'row'} w="full" mt="12px">
        <Text>don't have an account yet? </Text>
        <Link to={'/register'}>
          <Text color="brand.solid">Create account</Text>
        </Link>
      </HStack>
    </Container>
  );
}
