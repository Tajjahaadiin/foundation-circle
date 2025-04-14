import { likeLogo, likeLogoOutline, replyLogoOutline } from '@/assets/icons';
import { Avatar } from '@/components/ui/avatar';
import {
  Box,
  BoxProps,
  Button,
  Image,
  Text,
  HStack,
  Show,
  Flex,
} from '@chakra-ui/react';
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
import { getRelativeTime } from '@/utils/time-utils';
import { DangerMenu } from './menu';
import { UpdateThread } from './update-thread-dialog';
import { useAuthStore } from '@/stores/authStore';
interface CardThreadProps extends BoxProps {
  thread: Thread;
}

export default function CardThread({ thread, ...props }: CardThreadProps) {
  const { user } = useAuthStore();
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
  function onClickProfile() {
    if (user?.id !== thread.user?.id) {
      const userId = thread.user?.id;
      navigate(`/profile/${userId}`);
    } else {
      navigate('/profile');
    }
  }
  return (
    <Box {...props}>
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
          <Box display={'flex'} justifyContent={'space-between'}>
            <Flex
              gap={'4px'}
              alignItems={'center'}
              onClick={onClickProfile}
              cursor={'pointer'}
            >
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
            </Flex>

            <HStack justifySelf={'flex-end'} alignItems={'end'}>
              <Show when={thread.user?.id === user?.id}>
                <DangerMenu threadId={thread.id} />
                <UpdateThread thread={thread} />
              </Show>
            </HStack>
          </Box>
          <Box
            w={'full'}
            flexDir={'column'}
            justifyContent={'center'}
            alignItems={'start'}
            display={'flex'}
            spaceY={5}
          >
            <Text cursor={'pointer'} onClick={onClickCard} color={'white'}>
              {thread.content}
            </Text>
            <Image
              src={thread.images}
              rounded={'4xl'}
              maxH={'300px'}
              w={'100%'}
              objectFit={'cover'}
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
            >
              <HStack cursor={'pointer'} onClick={onClickCard} gap={'1.5'}>
                <Image src={replyLogoOutline} width={'27px'} />
                <Text color={'white'}>{thread.repliesCount ?? 0} </Text>
                <Text color={'text.light'}>Replies</Text>
              </HStack>
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
