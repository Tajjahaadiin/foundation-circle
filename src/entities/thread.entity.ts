import { LikeEntity } from './like.entity';
import { ReplyEntity } from './reply.entity';
import { ProfileEntity } from './profile.entity';
import { Userprofile } from '@/features/thread/dto/thread';

export interface ThreadEntity {
  id: string;
  content: string;
  images: string;
  user?: Userprofile;
  likes?: LikeEntity[];
  replies?: ReplyEntity[];
  profile?: ProfileEntity;
  createdAt: string;
  updatedAt: string;
}
