import circleLogo from '@/assets/logo.svg';
import { floatingStyles } from '@/lib/theme';
import {
  Box,
  Button,
  Field,
  FieldErrorText,
  HStack,
  Image,
  Input,
  Spinner,
  Stack,
  Text,
} from '@chakra-ui/react';
import { Form, Link } from 'react-router-dom';
import { useLoginForm } from '../hooks/use-login';
export default function LoginForm() {
  const { errors, handleSubmit, isPending, onLogin, register } = useLoginForm();

  return (
    <Box>
      <Box my="20px">
        <Image src={circleLogo} mb="20px"></Image>
        <Box fontSize={{ base: '28px' }} fontWeight={'700'} color={'#FFFFFF'}>
          Login to Circle
        </Box>
      </Box>
      <Form onSubmit={handleSubmit(onLogin)}>
        <Stack w="full" gap="4">
          <Field.Root invalid={!!errors.loginId?.message} required>
            <Box pos="relative" w="full">
              <Input
                className="peer"
                placeholder=""
                rounded={'lg'}
                borderWidth={'2px'}
                borderColor={'#545454'}
                {...register(`loginId`)}
              />
              <Field.Label css={floatingStyles}>
                Email/Username <Field.RequiredIndicator />
              </Field.Label>
              <FieldErrorText>{errors.loginId?.message}</FieldErrorText>
            </Box>
          </Field.Root>
          <Field.Root invalid={!!errors['password']?.message} required>
            <Box pos="relative" w="full">
              <Input
                className="peer"
                placeholder=""
                borderRadius="8"
                type="password"
                rounded={'lg'}
                borderWidth={'2px'}
                borderColor={'#545454'}
                {...register('password')}
              />
              <Field.Label css={floatingStyles}>
                Password <Field.RequiredIndicator />
              </Field.Label>
              <FieldErrorText>{errors.password?.message}</FieldErrorText>
            </Box>
          </Field.Root>
          <Box w="full" display="flex" justifyContent="flex-end">
            <Button asChild variant="plain">
              <Link to={'/forgot-password'}>Forgot Password?</Link>
            </Button>
          </Box>
        </Stack>
        <Box justifyContent="flex-end" w="full">
          <Button
            variant="solid"
            w="full"
            role="submit"
            rounded={'4xl'}
            bg={'brand.solid'}
            type={'submit'}
            disabled={isPending ? true : false}
          >
            {isPending ? <Spinner /> : 'Login'}
          </Button>
        </Box>
      </Form>

      <HStack fontSize={{ base: '14px' }} direction={'row'} w="full" mt="12px">
        <Text>don't have an account yet? </Text>
        <Link to={'/register'}>
          <Text color="brand.solid">Create account</Text>
        </Link>
      </HStack>
    </Box>
  );
}
