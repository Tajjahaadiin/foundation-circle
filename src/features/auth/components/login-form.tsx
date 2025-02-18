import {
  Box,
  Field,
  Input,
  Stack,
  HStack,
  Button,
  Image,
  Text,
  FieldErrorText,
} from '@chakra-ui/react';
import { Form, Link } from 'react-router';
import circleLogo from '@/assets/logo.svg';
import { floatingStyles } from '@/lib/theme';
import { loginSchema, LoginSchemaDTO } from '@/utils/schemas/auth-schemas';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toaster } from '@/components/ui/toaster';
import { useNavigate } from 'react-router-dom';
import { userDatas } from '@/utils/datas/user';
export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<LoginSchemaDTO>({
    mode: 'onChange',
    resolver: zodResolver(loginSchema),
  });
  const navigate = useNavigate();
  const onSubmit = (data: LoginSchemaDTO) => {
    const user = userDatas.some((data) =>
      watch('loginId').includes('@')
        ? data.email === watch('loginId')
        : data.username === watch('loginId')
    );
    console.log('thi is input ', watch('loginId'));
    console.log('thi is user ', user);
    const promise = new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        if (!user) {
          reject();
        } else {
          resolve();
        }
      }, 5000);
    }).then(() => {
      navigate({ pathname: '/' });
    });

    toaster.promise(promise, {
      success: {
        title: 'login Success',
        description: `Wellcome ${data.loginId}`,
      },
      error: {
        title: 'login failed',
        description: 'Something went wrong, abort Regristration Process',
      },
      loading: { title: 'login...', description: 'Please wait' },
    });
  };

  return (
    <Box>
      <Box my="20px">
        <Image src={circleLogo} mb="20px"></Image>
        <Box fontSize={{ base: '28px' }} fontWeight={'700'} color={'#FFFFFF'}>
          Login to Circle
        </Box>
      </Box>
      <Form onSubmit={handleSubmit(onSubmit)}>
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
          >
            Login
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
