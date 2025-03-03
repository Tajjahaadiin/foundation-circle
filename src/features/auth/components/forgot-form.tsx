import {
  Box,
  Button,
  Container,
  Field,
  FieldErrorText,
  HStack,
  Image,
  Input,
  Spinner,
  Text,
} from '@chakra-ui/react';
// import {useForm} from 'react-hook-fom'
import circleLogo from '@/assets/logo.svg';
import { floatingStyles } from '@/lib/theme';
import { Form, Link } from 'react-router';
import { useForgotPasswordForm } from '../hooks/use-forgot-password-form';
export default function ForgotForm() {
  const { errors, handleSubmit, isPending, onSubmit, register } =
    useForgotPasswordForm();

  return (
    <Container maxW="md" mt="128px">
      <Box my="20px">
        <Image src={circleLogo} mb="20px"></Image>
        <Box fontSize={{ base: '28px' }} fontWeight={'700'} color={'#FFFFFF'}>
          Forgot Password
        </Box>
      </Box>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Field.Root invalid={!!errors.email?.message} required>
          <Box pos="relative" w="full">
            <Input
              className="peer"
              placeholder=""
              borderRadius="8"
              type="email"
              {...register('email')}
            />
            <Field.Label css={floatingStyles}>
              Email
              <Field.RequiredIndicator />
            </Field.Label>
            <FieldErrorText>{errors.email?.message}</FieldErrorText>
          </Box>
        </Field.Root>

        <Box justifyContent="flex-end" w="full" mt="12px">
          <Button
            variant="solid"
            w="full"
            role="submit"
            rounded={'4xl'}
            bg={'brand.solid'}
            type={'submit'}
            disabled={isPending ? true : false}
          >
            {isPending ? <Spinner /> : 'Send instruction'}
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
