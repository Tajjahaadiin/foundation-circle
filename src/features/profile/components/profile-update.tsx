import { galleryAddLogo } from '@/assets/icons';
import { Avatar } from '@/components/ui/avatar';
import { floatingStyles } from '@/lib/theme';
import { useAuthStore } from '@/stores/authStore';
import {
  Box,
  Button,
  CloseButton,
  Dialog,
  Field,
  FieldErrorText,
  Flex,
  Float,
  Image,
  Input,
  Portal,
} from '@chakra-ui/react';
import { Form } from 'react-router-dom';
import useUpdateProfile from '../hook/use-update-profile';
export const UpdateProfileButton = () => {
  const { user } = useAuthStore();

  const {
    errors,
    handleSubmit,
    isPending,
    onSubmit,
    register,
    registerImagesRef,
    restRegisterImages,
    registerImagesOnChange,
    previewURL,
    handlePreview,
    handleGalleryAddClick,
    inputFileRef,
    handleBannerAddClick,
    handleBannerPreview,
    inputBannerRef,
    previewBanner,
    registerBannerOnChange,
    registerBannerref,
    restRegisterBanner,
    clearForm,
  } = useUpdateProfile();
  return (
    <Dialog.Root size={'xs'}>
      <Dialog.Trigger asChild>
        <Button
          color={'white'}
          variant="outline"
          size="xs"
          flexBasis={'20'}
          colorPalette={'green'}
          border={'1px solid'}
          _hover={{ color: 'white', bg: 'brand.solid' }}
          rounded={'4xl'}
          justifySelf={'flex-end'}
        >
          edit profile
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content bg={'bgSite.solid'}>
            <Dialog.Header
              p={'5px 12px'}
              display={'flex'}
              justifyContent={'space-between'}
              flexDir={'row'}
            >
              <Dialog.Title color={'white'}>Edit Profile</Dialog.Title>
              <Dialog.CloseTrigger asChild>
                <CloseButton
                  size={'2xs'}
                  color={'white'}
                  border={'1px solid white'}
                  rounded={'full'}
                  onClick={clearForm}
                />
              </Dialog.CloseTrigger>
            </Dialog.Header>
            <Dialog.Body>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Flex flexDir={'column'}>
                  <Box
                    position="relative"
                    h={'12vh'}
                    w={'full'}
                    alignSelf={'center'}
                    rounded={'lg'}
                  >
                    <Box maxH={'200px'}>
                      <Image
                        objectFit={'cover'}
                        maxH={'80px'}
                        w={'full'}
                        rounded={'lg'}
                        src={previewBanner ?? user?.profile.bannerUrl ?? ''}
                      />
                    </Box>
                    <Float placement={'middle-center'}>
                      <Button
                        size={'xs'}
                        variant={'ghost'}
                        onClick={handleBannerAddClick}
                        _hover={{ bg: 'initial' }}
                      >
                        <Image
                          maxW={'300%'}
                          src={galleryAddLogo}
                          bg={'bgSite.solid'}
                          rounded={'full'}
                          p={'0.5'}
                        />
                      </Button>
                    </Float>
                    <Float placement={'bottom-start'} offsetX="10">
                      <Avatar
                        name={user?.profile?.fullName ?? ''}
                        src={previewURL ?? user?.profile?.avatarUrl ?? ''}
                        size={'2xl'}
                      />
                      <Float placement={'middle-center'}>
                        <Button
                          size={'xs'}
                          variant={'ghost'}
                          onClick={handleGalleryAddClick}
                          _hover={{ bg: 'initial' }}
                        >
                          <Image
                            maxW={'300%'}
                            src={galleryAddLogo}
                            bg={'bgSite.solid'}
                            rounded={'full'}
                            p={'0.5'}
                          />
                        </Button>
                      </Float>
                    </Float>
                  </Box>
                </Flex>

                <Flex flexDir={'column'} gap={'4'} w={'full'} mt={10}>
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
                  <Input
                    type={'file'}
                    hidden
                    {...restRegisterImages}
                    onChange={(e) => {
                      handlePreview(e);
                      registerImagesOnChange(e);
                    }}
                    ref={(e) => {
                      registerImagesRef(e);
                      inputFileRef.current = e;
                    }}
                  />
                  <Input
                    type={'file'}
                    hidden
                    {...restRegisterBanner}
                    onChange={(e) => {
                      handleBannerPreview(e);
                      registerBannerOnChange(e);
                    }}
                    ref={(e) => {
                      registerBannerref(e);
                      inputBannerRef.current = e;
                    }}
                  />
                  <Field.Root invalid={!!errors['username']?.message} required>
                    <Box pos="relative" w="full">
                      <Input
                        className="peer"
                        placeholder=""
                        type="text"
                        rounded={'lg'}
                        borderWidth={'2px'}
                        borderColor={'#545454'}
                        color={'white'}
                        {...register('username')}
                      />
                      <Field.Label css={floatingStyles} color={'text.light'}>
                        username <Field.RequiredIndicator />
                      </Field.Label>
                    </Box>
                    <FieldErrorText>{errors.username?.message}</FieldErrorText>
                  </Field.Root>
                  <Field.Root invalid={!!errors['bio']?.message} required>
                    <Box pos="relative" w="full">
                      <Input
                        className="peer"
                        placeholder=""
                        type="text"
                        rounded={'lg'}
                        borderWidth={'2px'}
                        borderColor={'#545454'}
                        color={'white'}
                        {...register('bio')}
                      />
                      <Field.Label css={floatingStyles} color={'text.light'}>
                        Bio <Field.RequiredIndicator />
                      </Field.Label>
                    </Box>
                    <FieldErrorText>{errors.bio?.message}</FieldErrorText>
                  </Field.Root>
                </Flex>
                <Flex justifyContent={'flex-end'} mt={'2'}>
                  <Button
                    bg={'brand.solid'}
                    size={'xs'}
                    rounded={'4xl'}
                    loading={isPending ? true : false}
                    type="submit"
                  >
                    Save
                  </Button>
                </Flex>
              </Form>
            </Dialog.Body>
            {/* <Dialog.Footer></Dialog.Footer> */}
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
