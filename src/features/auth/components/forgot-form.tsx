import {
  Box,
  Field,
  Input,
  HStack,
  Button,
  Image,
  Container,
  Text,
  FieldErrorText,
} from '@chakra-ui/react';
// import {useForm} from 'react-hook-fom'
import { Form, Link } from 'react-router';
import circleLogo from '@/assets/logo.svg';
import { floatingStyles } from '@/lib/theme';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
  forgotPasswordSchema,
  ForgotPasswordSchemaDTO,
} from '@/utils/schemas/auth-schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { toaster } from '@/components/ui/toaster';
export default function ForgotForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordSchemaDTO>({
    mode: 'onChange',
    resolver: zodResolver(forgotPasswordSchema),
  });
  const navigate = useNavigate();
  const onSubmit = (data: ForgotPasswordSchemaDTO) => {
    const promise = new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 5000);
    }).then(() => {
      navigate({ pathname: '/' });
    });

    toaster.promise(promise, {
      success: {
        title: 'Change Granted',
        description: `Wellcome ${data.email}`,
      },
      error: {
        title: 'Change failed',
        description: 'Something went wrong, abort  Process',
      },
      loading: { title: 'FogotPassword...', description: 'Please wait' },
    });
  };

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
