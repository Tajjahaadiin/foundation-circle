import {
  Box,
  Button,
  Container,
  Field,
  Image,
  Input,
  Stack,
} from '@chakra-ui/react';
// import {useForm} from 'react-hook-fom'
import circleLogo from '@/assets/logo.svg';
import { floatingStyles } from '@/lib/theme';
import { Form } from 'react-router';
export default function ResetForm() {
  return (
    <Container maxW="md" mt="128px">
      <Box my="20px">
        <Image src={circleLogo} mb="20px"></Image>
        <Box fontSize={{ base: '28px' }} fontWeight={'700'} color={'#FFFFFF'}>
          Reset Password
        </Box>
      </Box>
      <Form>
        <Stack w="full" gap="4">
          <Field.Root required>
            <Box pos="relative" w="full">
              <Input
                className="peer"
                placeholder=""
                borderRadius="8"
                name="newpassword"
                type="password"
              />
              <Field.Label css={floatingStyles}>
                New Password <Field.RequiredIndicator />
              </Field.Label>
            </Box>
          </Field.Root>
          <Field.Root required>
            <Box pos="relative" w="full">
              <Input
                className="peer"
                placeholder=""
                borderRadius="8"
                name="confirmpassword"
                type="password"
              />
              <Field.Label css={floatingStyles}>
                Confirm New Password <Field.RequiredIndicator />
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
            Create New Password
          </Button>
        </Box>
      </Form>
    </Container>
  );
}
