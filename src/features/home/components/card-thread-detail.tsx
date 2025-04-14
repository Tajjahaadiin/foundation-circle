import { likeLogo, likeLogoOutline } from '@/assets/icons';
import { Avatar } from '@/components/ui/avatar';
import { toaster } from '@/components/ui/toaster';
import { LikeResponse } from '@/features/like/dto/like';
import { Thread } from '@/features/thread/dto/thread';
import { api } from '@/lib/api';
import {
  CreateLikeSchemaDTO,
  DeleteLikeSchemaDTO,
} from '@/utils/schemas/like.schema';
import { Box, Button, HStack, Image, Show, Text } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useParams } from 'react-router-dom';
import { UpdateThread } from './update-thread-dialog';
import { getRelativeTime } from '@/utils/time-utils';
import { useAuthStore } from '@/stores/authStore';

export default function CardThreadDetail(thread: Thread) {
  const { user } = useAuthStore();
  const { threadId } = useParams();
  const queryClient = useQueryClient();
  console.log(thread.user?.profile.fullName);
  const { isPending: isPendingLike, mutateAsync: mutateLike } = useMutation<
    LikeResponse,
    Error,
    CreateLikeSchemaDTO
  >({
    mutationKey: ['like'],
    mutationFn: async (data: CreateLikeSchemaDTO) => {
      const response = await api.post<LikeResponse>('/likes', data);
      return response.data;
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        return toaster.create({
          title: error.response?.data.message,
          type: 'error',
        });
      }

      toaster.create({
        title: 'Something went wrong!',
        type: 'error',
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [`threads/${threadId}`],
      });
    },
  });

  const { isPending: isPendingUnlike, mutateAsync: mutateUnlike } = useMutation<
    LikeResponse,
    Error,
    DeleteLikeSchemaDTO
  >({
    mutationKey: ['unlike'],
    mutationFn: async (data: DeleteLikeSchemaDTO) => {
      const response = await api.delete<LikeResponse>(
        `/likes/${data.threadId}`
      );
      return response.data;
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        return toaster.create({
          title: error.response?.data.message,
          type: 'error',
        });
      }

      toaster.create({
        title: 'Something went wrong!',
        type: 'error',
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [`threads/${threadId}`],
      });
    },
  });

  async function onLike(data: CreateLikeSchemaDTO) {
    await mutateLike(data);
  }

  async function onUnlike(data: DeleteLikeSchemaDTO) {
    await mutateUnlike(data);
  }

  return (
    <Box>
      <Box display={'flex'} gap={'16px'} px={'40px'} py={'20px'} w={'full'}>
        <Avatar
          name={thread.user?.profile.fullName || ''}
          src={thread.user?.profile.avatarUrl ?? ''}
          shape="full"
          size="full"
          width={'50px'}
          height={'50px'}
        />
        <Box display={'flex'} flexDirection={'column'} gap={'4px'} flex={'3'}>
          <Box display={'flex'} gap={'4px'} alignItems={'center'}>
            <Text fontWeight={'bold'} textStyle={'md'} color={'white'}>
              {thread.user?.profile.fullName}
            </Text>
            <Text textStyle={'sm'} color={'text.light'}>
              @{thread.user?.username}
            </Text>
            <Text color={'white'}>•</Text>
            <Text color={'white'} textStyle={'sm'}>
              {getRelativeTime(thread.createdAt)}
            </Text>
          </Box>
          <Box
            w={'full'}
            flexDir={'column'}
            justifyContent={'center'}
            alignItems={'start'}
            display={'flex'}
            spaceY={5}
          >
            <Text cursor={'pointer'} color={'white'}>
              {thread.content}
            </Text>
            <Image
              src={thread.images}
              rounded={'4xl'}
              maxH={'300px'}
              maxW={'75%'}
            ></Image>
          </Box>
          <Box display={'flex'}>
            <Button
              variant={'ghost'}
              display={'flex'}
              gap={'4px'}
              _hover={{ bg: 'initial' }}
              disabled={isPendingLike || isPendingUnlike}
              onClick={() =>
                thread.isLiked
                  ? onUnlike({ threadId: thread.id })
                  : onLike({ threadId: thread.id })
              }
            >
              <Image
                src={thread.isLiked ? likeLogo : likeLogoOutline}
                width={'27px'}
              />
              <Text color={'white'}>{thread.likesCount}</Text>
            </Button>
            <Button
              variant={'ghost'}
              display={'flex'}
              _hover={{ bg: 'initial' }}
              gap={'4px'}
            ></Button>
          </Box>
        </Box>
        <Show when={thread.user?.id === user?.id}>
          <HStack
            justifySelf={'flex-start'}
            alignItems={'start'}
            zIndex={'docked'}
          >
            <UpdateThread thread={thread} />
          </HStack>
        </Show>
      </Box>
    </Box>
  );
}
