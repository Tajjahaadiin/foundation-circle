import { likeLogo, likeLogoOutline, replyLogoOutline } from '@/assets/icons';
import { Avatar } from '@/components/ui/avatar';
import { Box, BoxProps, Button, Image, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { Thread } from '@/features/thread/dto/thread';
import {
  CreateLikeSchemaDTO,
  DeleteLikeSchemaDTO,
} from '@/utils/schemas/like.schema';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { toaster } from '@/components/ui/toaster';
import { api } from '@/lib/api';
import { LikeResponse } from '@/features/like/dto/like';
interface CardThreadProps extends BoxProps {
  thread: Thread;
}

export default function CardThread({ thread, ...props }: CardThreadProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  function onClickCard() {
    navigate(`/detail/${thread.id}`);
  }
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
        queryKey: ['threads'],
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
        queryKey: ['threads'],
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
    <Box {...props}>
      <Box display={'flex'} gap={'16px'} px={'40px'} py={'20px'} w={'full'}>
        <Avatar
          name={thread.user?.profile.fullName || ''}
          src={`https://api.dicebear.com/9.x/big-smile/svg?seed=${thread.user?.profile.fullName}`}
          shape="full"
          size="full"
          width={'50px'}
          height={'50px'}
        />
        <Box display={'flex'} flexDirection={'column'} gap={'4px'}>
          <Box display={'flex'} gap={'4px'} alignItems={'center'}>
            <Text fontWeight={'bold'} textStyle={'md'}>
              {thread.user?.profile.fullName}
            </Text>
            <Text textStyle={'sm'} color={'text.light'}>
              @{thread.user?.username}
            </Text>
            <Text color={'secondary'}>•</Text>
            <Text color={'secondary'}>
              {new Date(
                new Date(thread.createdAt).getMilliseconds() - Date.now()
              ).getHours()}
              h
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
            <Text cursor={'pointer'} onClick={onClickCard}>
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
              <Text>{thread.likesCount}</Text>
            </Button>
            <Button variant={'ghost'} display={'flex'} gap={'4px'}>
              <Image src={replyLogoOutline} width={'27px'} />
              <Text>{thread.repliesCount}</Text>
              <Text>Replies</Text>
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
