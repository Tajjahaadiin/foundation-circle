import { Avatar } from '@/components/ui/avatar';
import MyBrandBtn from '@/components/ui/brand-button';
import {
  Box,
  Button,
  CloseButton,
  Dialog,
  Field,
  Input,
  Portal,
  Textarea,
  Image,
  Text,
} from '@chakra-ui/react';
import { useCreateThread } from '../hooks/use-create-thread';
import { galleryAddLogo } from '@/assets/icons';
import { useLocation } from 'react-router-dom';

export const CreatePost = () => {
  const { pathname } = useLocation();
  const isHome = pathname === '/';
  const {
    fullName,
    avatarUrl,
    previewURL,
    inputFileRef,
    register,
    handleSubmit,
    errors,
    registerImagesRef,
    registerImagesOnChange,
    restRegisterImages,
    isPending,
    onSubmit,
    onClickFile,
    handlePreview,
    clearForm,
  } = useCreateThread();
  return (
    <Dialog.Root size={'sm'}>
      <Dialog.Trigger asChild>
        <MyBrandBtn
          w={'2xs'}
          alignSelf={'center'}
          onClick={() => clearForm()}
          disabled={!isHome}
        >
          Create Post
        </MyBrandBtn>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content bg={'bgSite.solid'}>
            <Dialog.CloseTrigger asChild>
              <Box display={'flex'} justifyContent={'end'} px={'3'} pt={'2'}>
                <CloseButton
                  size={'2xs'}
                  variant={'ghost'}
                  justifyContent={'center'}
                  justifySelf={'end'}
                  rounded={'full'}
                  border={'1px solid #fff'}
                  color={'white'}
                />
              </Box>
            </Dialog.CloseTrigger>
            <Dialog.Body>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Box
                  display={'flex'}
                  flexDirection={'column'}
                  padding={'0px 0px'}
                  spaceY={2}
                >
                  <Box
                    display={'flex'}
                    alignItems={'center'}
                    gap={'4'}
                    py={'2'}
                    borderBottom={'1px solid'}
                    borderColor={'white'}
                  >
                    <Avatar
                      name={fullName || ''}
                      src={avatarUrl || ''}
                      shape="full"
                      size="full"
                      width={'50px'}
                      height={'50px'}
                    />
                    <Field.Root invalid={!!errors.content?.message}>
                      <Textarea
                        color={'white'}
                        border={'none'}
                        placeholder="What is happening?!"
                        {...register('content')}
                      />
                      <Field.ErrorText>
                        {errors.content?.message}
                      </Field.ErrorText>
                    </Field.Root>
                  </Box>
                  <Box
                    display={'flex'}
                    alignItems={'center'}
                    justifyContent={'space-between'}
                  >
                    <Button
                      variant={'ghost'}
                      onClick={onClickFile}
                      _hover={{ bg: 'initial' }}
                    >
                      <Image src={galleryAddLogo} width={'27px'} />
                    </Button>
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

                    <Button
                      type="submit"
                      backgroundColor={'brand.solid'}
                      color={'white'}
                      w={'1/5'}
                      h={'8'}
                      rounded={'4xl'}
                      loading={isPending ? true : false}
                    >
                      <Text color={'white'} fontSize={'xs'}>
                        Post
                      </Text>
                    </Button>
                  </Box>
                  <Box w={'full'} display={'flex'} justifyContent={'start'}>
                    <Image
                      rounded={'3xl'}
                      objectFit={'contain'}
                      maxHeight={'200px'}
                      maxWidth={'100%'}
                      src={previewURL ?? ''}
                    />
                  </Box>
                </Box>
              </form>
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
