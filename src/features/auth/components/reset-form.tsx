import {
  Box,
  Button,
  Container,
  Field,
  FieldErrorText,
  Image,
  Input,
  Spinner,
  Stack,
} from '@chakra-ui/react';
// import {useForm} from 'react-hook-fom'
import circleLogo from '@/assets/logo.svg';
import { floatingStyles } from '@/lib/theme';
import { Form } from 'react-router';
import { usePasswordForm } from '../hooks/use-password-form';

export default function ResetForm() {
  const { errors, handleSubmit, onSubmit, isPending, register } =
    usePasswordForm();
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
          <Field.Root invalid={!!errors['newPassword']?.message} required>
            <Box pos="relative" w="full">
              <Input
                className="peer"
                placeholder=""
                borderRadius="8"
                type="password"
                rounded={'lg'}
                borderWidth={'2px'}
                borderColor={'#545454'}
                {...register('newPassword')}
              />
              <Field.Label css={floatingStyles}>
                New Password <Field.RequiredIndicator />
              </Field.Label>
              <FieldErrorText>{errors.confirmPassword?.message}</FieldErrorText>
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
              <FieldErrorText>{errors.confirmPassword?.message}</FieldErrorText>
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
            disabled={isPending ? true : false}
          >
            {isPending ? <Spinner /> : 'Create New Password'}
          </Button>
        </Box>
      </Form>
    </Container>
  );
}
