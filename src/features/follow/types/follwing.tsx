import { UserEntity } from '@/entities/user.entity';
import { ProfileEntity } from '@/entities/profile.entity';

export type Following = UserEntity & {
  profile: ProfileEntity;
};
