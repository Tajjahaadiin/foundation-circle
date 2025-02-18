import {
  Box,
  Button,
  Container,
  Field,
  FieldErrorText,
  Image,
  Input,
  Stack,
} from '@chakra-ui/react';
// import {useForm} from 'react-hook-fom'
import circleLogo from '@/assets/logo.svg';
import { floatingStyles } from '@/lib/theme';
import { Form } from 'react-router';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { userDatas } from '@/utils/datas/user';
import {
  resetPasswordSchema,
  ResetPasswordSchemaDTO,
} from '@/utils/schemas/auth-schemas';
import { toaster } from '@/components/ui/toaster';
export default function ResetForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ResetPasswordSchemaDTO>({
    mode: 'all',
    resolver: zodResolver(resetPasswordSchema),
  });
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const email = searchParams.get('email');

  const onSubmit = (data: ResetPasswordSchemaDTO) => {
    const user = userDatas.find((userData) => userData.email === email);
    const promise = new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        if (!user) {
          reject();
        } else if (user.password === watch('password')) {
          reject();
        } else {
          resolve();
        }
      }, 5000);
    }).then(() => {
      navigate({ pathname: '/login' });
    });

    console.log(data);

    toaster.promise(promise, {
      success: {
        title: 'Change Granted',
        description: `succesfully`,
      },
      error: {
        title: 'Change failed',
        description: 'Something went wrong, abort  Process',
      },
      loading: { title: 'reset pasword...', description: 'Please wait' },
    });
  };

  return (
    <Container maxW="md" mt="128px">
      <Box my="20px">
        <Image src={circleLogo} mb="20px"></Image>
        <Box fontSize={{ base: '28px' }} fontWeight={'700'} color={'#FFFFFF'}>
          Reset Password
        </Box>
      </Box>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Stack w="full" gap="4">
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
                New Password <Field.RequiredIndicator />
              </Field.Label>
              <FieldErrorText>{errors.password?.message}</FieldErrorText>
            </Box>
          </Field.Root>
          <Field.Root invalid={!!errors['confirmPassword']?.message} required>
            <Box pos="relative" w="full">
              <Input
                className="peer"
                placeholder=""
                borderRadius="8"
                type="password"
                rounded={'lg'}
                borderWidth={'2px'}
                borderColor={'#545454'}
                {...register('confirmPassword')}
              />
              <Field.Label css={floatingStyles}>
                Confirm New Password <Field.RequiredIndicator />
              </Field.Label>
              <FieldErrorText>{errors.password?.message}</FieldErrorText>
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
            type="submit"
          >
            Create New Password
          </Button>
        </Box>
      </Form>
    </Container>
  );
}
