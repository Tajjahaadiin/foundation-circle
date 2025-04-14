import { ProfileEntity } from './profile.entity';

export interface UserEntity {
  id: string;
  email: string;
  username: string;
  password: string;
  profile?: ProfileEntity;
  followersCount?: string;
  followingCount?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
