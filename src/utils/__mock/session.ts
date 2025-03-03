export const isLogin: boolean = false;

interface UserSession {
  fullName: string;
  username: string;
  followersCount: number;
  followingsCount: number;
  avatarUrl: string;
  backgroundUrl: string;
  bio?: string;
}

export const userSession: UserSession = {
  fullName: 'Jhon Doe',
  username: 'JhonDOe',
  backgroundUrl: 'https://api.dicebear.com/9.x/glass/svg?seed=Jhon%Doe',
  avatarUrl: 'https://api.dicebear.com/9.x/big-smile/svg?seed=Jhon%Doe',
  followersCount: 1001,
  followingsCount: 0,
  bio: "I'm fullstack developer 😎👍",
};
