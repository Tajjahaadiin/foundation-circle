import { UserEntity } from '@/entities/user.entity';
import { ProfileEntity } from '@/entities/profile.entity';

export type SearchUser = UserEntity & {
  profile: ProfileEntity;
};
