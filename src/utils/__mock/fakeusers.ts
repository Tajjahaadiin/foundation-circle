import type { User } from '@/stores/authStore';

// interface UserLogin {
//   id: string | null;
//   fullName: string | null;
//   avatarUrl: string | null;
//   bannerUrl: string | null;
//   followersCount: string | null;
//   followingsCount: string | null;
//   bio: string | null;
//   email: string | null;
//   username: string | null;
//   password: string | null;
//   createdAt?: Date;
//   updatedAt?: Date;
// }

export const userDatas: User[] = [
  {
    id: 'adake',
    fullName: 'Jhon Doe',
    username: 'JhonDoe',
    email: 'Jhon@gmail.com',
    password: '1234',
    followersCount: '100',
    followingsCount: '50',
    avatarUrl: 'https://api.dicebear.com/9.x/big-smile/svg?seed=Jhon%Doe', // Updated to big-smile
    bannerUrl: 'https://api.dicebear.com/9.x/glass/svg?seed=Jhon%Doe',
    bio: 'IM Fullstack Developer',
  },
  {
    id: 'adak',
    fullName: 'Test Duane',
    username: 'test2',
    email: 'test2@gmail.com',
    password: '1234',
    followersCount: '1',
    followingsCount: '1000',
    avatarUrl: 'https://api.dicebear.com/9.x/big-smile/svg?seed=test2', // Updated to big-smile
    bannerUrl: 'https://api.dicebear.com/9.x/glass/svg?seed=test2',
    bio: 'Haiiiii',
  },
];
