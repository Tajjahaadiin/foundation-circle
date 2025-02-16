import {
  Box,
  Field,
  Input,
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
export default function ForgotForm() {
  return (
    <Container maxW="md" mt="128px">
      <Box my="20px">
        <Image src={circleLogo} mb="20px"></Image>
        <Box fontSize={{ base: '28px' }} fontWeight={'700'} color={'#FFFFFF'}>
          Forgot Password
        </Box>
      </Box>
      <Form>
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

        <Box justifyContent="flex-end" w="full" mt="12px">
          <Button
            variant="solid"
            w="full"
            role="submit"
            borderRadius="full"
            bg={'brand.solid'}
          >
            Send Instruction
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
