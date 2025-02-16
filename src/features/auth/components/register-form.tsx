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
// import {useForm} from 'react-hook-fom'
import { Form, Link } from 'react-router';
import circleLogo from '@/assets/logo.svg';
import { floatingStyles } from '@/lib/theme';
export default function RegisterForm() {
  return (
    <Container maxW="md" mt="128px">
      <Box my="20px">
        <Image src={circleLogo} mb="20px"></Image>
        <Box fontSize={{ base: '28px' }} fontWeight={'700'} color={'#FFFFFF'}>
          Create circle Account
        </Box>
      </Box>
      <Form>
        <Stack w="full" gap="4">
          <Field.Root required>
            <Box pos="relative" w="full">
              <Input
                className="peer"
                placeholder=""
                name="fullname"
                type="text"
              />
              <Field.Label css={floatingStyles}>
                Full Name <Field.RequiredIndicator />
              </Field.Label>
            </Box>
          </Field.Root>
          <Field.Root required>
            <Box pos="relative" w="full">
              <Input className="peer" placeholder="" name="username" />
              <Field.Label css={floatingStyles}>
                Username <Field.RequiredIndicator />
              </Field.Label>
            </Box>
          </Field.Root>
          <Field.Root required>
            <Box pos="relative" w="full">
              <Input
                className="peer"
                placeholder=""
                borderRadius="8"
                name="email"
                type="email"
              />
              <Field.Label css={floatingStyles}>
                Email
                <Field.RequiredIndicator />
              </Field.Label>
            </Box>
          </Field.Root>
          <Field.Root required>
            <Box pos="relative" w="full">
              <Input
                className="peer"
                placeholder=""
                borderRadius="8"
                name="password"
                type="password"
              />
              <Field.Label css={floatingStyles}>
                Password <Field.RequiredIndicator />
              </Field.Label>
            </Box>
          </Field.Root>
        </Stack>
        <Box justifyContent="flex-end" w="full" mt="12px">
          <Button
            variant="solid"
            w="full"
            role="submit"
            borderRadius="full"
            bg={'brand.solid'}
          >
            Let's Go
          </Button>
        </Box>
      </Form>
      <HStack direction={'row'} w="full" mt="12px">
        <Text fontSize={{ base: '14px' }}>already have account? </Text>
        <Link to={'/login'}>
          <Text color="brand.solid" fontSize={{ base: '14px' }}>
            Login
          </Text>
        </Link>
      </HStack>
    </Container>
  );
}
