import { UserEntity } from '@/entities/user.entity';
import { ProfileEntity } from '@/entities/profile.entity';

export type Followers = UserEntity & {
  profile: ProfileEntity;
  isFollowing: boolean;
};
