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
  FieldErrorText,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { Form, Link } from 'react-router';
import circleLogo from '@/assets/logo.svg';
import { floatingStyles } from '@/lib/theme';
import {
  registerSchema,
  RegisterSchemaDTO,
} from '@/utils/schemas/auth-schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { toaster } from '@/components/ui/toaster';
import { useNavigate } from 'react-router-dom';
export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchemaDTO>({
    mode: 'onChange',
    resolver: zodResolver(registerSchema),
  });
  console.log('error', errors);
  const navigate = useNavigate();

  const onSubmit = (data: RegisterSchemaDTO) => {
    console.log(data);
    const promise = new Promise<void>((resolve) => {
      setTimeout(() => resolve(), 5000);
    }).then(() => {
      navigate({ pathname: '/' });
    });

    toaster.promise(promise, {
      success: {
        title: 'Register Success',
        description: `Wellcome ${data.fullName}`,
      },
      error: {
        title: 'Register failed',
        description: 'Something went wrong, abort Regristration Process',
      },
      loading: { title: 'Register...', description: 'Please wait' },
    });
  };
  return (
    <Container maxW="md" mt="128px">
      <Box my="20px">
        <Image src={circleLogo} mb="20px"></Image>
        <Box fontSize={{ base: '28px' }} fontWeight={'700'} color={'#FFFFFF'}>
          Create circle Account
        </Box>
      </Box>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Stack w="full" gap="4">
          <Field.Root invalid={!!errors['fullName']?.message} required>
            <Box pos="relative" w="full">
              <Input
                className="peer"
                placeholder=""
                type="text"
                rounded={'lg'}
                borderWidth={'2px'}
                borderColor={'#545454'}
                {...register('fullName')}
              />
              <Field.Label css={floatingStyles}>
                Full Name <Field.RequiredIndicator />
              </Field.Label>
            </Box>
            <FieldErrorText>{errors.fullName?.message}</FieldErrorText>
          </Field.Root>
          <Field.Root invalid={!!errors['userName']?.message} required>
            <Box pos="relative" w="full">
              <Input
                className="peer"
                placeholder=""
                rounded={'lg'}
                borderWidth={'2px'}
                borderColor={'#545454'}
                {...register('userName')}
              />
              <Field.Label css={floatingStyles}>
                Username <Field.RequiredIndicator />
              </Field.Label>
            </Box>
            <FieldErrorText>{errors.userName?.message}</FieldErrorText>
          </Field.Root>
          <Field.Root invalid={!!errors['email']?.message} required>
            <Box pos="relative" w="full">
              <Input
                className="peer"
                placeholder=""
                type="email"
                rounded={'lg'}
                borderWidth={'2px'}
                borderColor={'#545454'}
                {...register('email')}
              />
              <Field.Label css={floatingStyles}>
                Email
                <Field.RequiredIndicator />
              </Field.Label>
            </Box>
            <FieldErrorText>{errors.email?.message}</FieldErrorText>
          </Field.Root>
          <Field.Root invalid={!!errors['password']?.message} required>
            <Box pos="relative" w="full">
              <Input
                className="peer"
                placeholder=""
                type="password"
                rounded={'lg'}
                borderWidth={'2px'}
                borderColor={'#545454'}
                {...register('password')}
              />
              <Field.Label css={floatingStyles}>
                Password <Field.RequiredIndicator />
              </Field.Label>
            </Box>
            <FieldErrorText>{errors.password?.message}</FieldErrorText>
          </Field.Root>
        </Stack>
        <Box justifyContent="flex-end" w="full" mt="12px">
          <Button
            variant="solid"
            w="full"
            role="submit"
            borderRadius="full"
            bg={'brand.solid'}
            type="submit"
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
