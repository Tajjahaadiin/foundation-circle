export type Profile = {
  fullName?: string;
};
export type UserPost = {
  username: string;
  profile: Profile;
};

export type Reply = {
  id: string;
  user: UserPost;
  content: string;
  likesCount: number;
  createdAt: Date;
};

export type Threads = {
  id: string;
  user: UserPost;

  content: string;
  images: string;
  likesCount: number;
  repliesCount: number;
  replies?: Reply[];
  isLiked: boolean;
  createdAt: Date;
};
