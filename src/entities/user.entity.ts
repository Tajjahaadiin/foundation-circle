import { ProfileEntity } from './profile.entity';

export interface UserEntity {
  id: string;
  email: string;
  username: string;
  password: string;
  profile?: ProfileEntity;
  createdAt?: Date;
  updatedAt?: Date;
}
