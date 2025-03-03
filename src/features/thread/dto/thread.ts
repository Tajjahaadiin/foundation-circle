import { ProfileEntity } from '@/entities/profile.entity';
import { ThreadEntity } from '@/entities/thread.entity';
import { UserEntity } from '@/entities/user.entity';

export type Thread = ThreadEntity & {
  likesCount: number;
  repliesCount: number;
  isLiked: boolean;
};
export type Userprofile = UserEntity & {
  profile: ProfileEntity;
};
export type ThreadResponse = {
  message: string;
  data: {
    id: string;
    content: string;
    imageUrl: string | null;
    createdAt: string;
    updatedAt: string;
  };
};
