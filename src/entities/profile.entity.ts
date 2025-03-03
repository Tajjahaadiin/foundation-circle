export interface ProfileEntity {
  id: string | null;
  fullName: string | null;
  avatarUrl?: string;
  bannerUrl: string;
  bio: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}
