import circleLogo from '@/assets/logo.svg';
import { floatingStyles } from '@/lib/theme';
import {
  Box,
  Button,
  Container,
  Field,
  FieldErrorText,
  HStack,
  Image,
  Input,
  Stack,
  Text,
} from '@chakra-ui/react';
import { Form, Link } from 'react-router';
import useRegister from '../hooks/use-register';
export default function RegisterForm() {
  const { errors, handleSubmit, isPending, onSubmit, register } = useRegister();
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
                color={'white'}
                {...register('fullName')}
              />
              <Field.Label css={floatingStyles} color={'text.light'}>
                Full Name <Field.RequiredIndicator />
              </Field.Label>
            </Box>
            <FieldErrorText>{errors.fullName?.message}</FieldErrorText>
          </Field.Root>
          <Field.Root invalid={!!errors['username']?.message} required>
            <Box pos="relative" w="full">
              <Input
                className="peer"
                placeholder=""
                rounded={'lg'}
                borderWidth={'2px'}
                borderColor={'#545454'}
                color={'white'}
                {...register('username')}
              />
              <Field.Label css={floatingStyles} color={'text.light'}>
                Username <Field.RequiredIndicator />
              </Field.Label>
            </Box>
            <FieldErrorText>{errors.username?.message}</FieldErrorText>
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
                color={'white'}
                {...register('email')}
              />
              <Field.Label css={floatingStyles} color={'text.light'}>
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
                color={'white'}
                {...register('password')}
              />
              <Field.Label css={floatingStyles} color={'text.light'}>
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
            loading={isPending ? true : false}
          >
            Let's Go
          </Button>
        </Box>
      </Form>
      <HStack direction={'row'} w="full" mt="12px">
        <Text fontSize={{ base: '14px' }} color={'text.light'}>
          already have account?{' '}
        </Text>
        <Link to={'/login'}>
          <Text color="brand.solid" fontSize={{ base: '14px' }}>
            Login
          </Text>
        </Link>
      </HStack>
    </Container>
  );
}
