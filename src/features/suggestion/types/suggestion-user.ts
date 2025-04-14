import { UserEntity } from '@/entities/user.entity';
import { ProfileEntity } from '@/entities/profile.entity';

export type sugesttion = UserEntity & {
  profile: ProfileEntity;
  isFollowing: boolean;
};
