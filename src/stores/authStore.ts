import { create } from 'zustand';
import { UserEntity } from '@/entities/user.entity';

import { ProfileEntity } from '@/entities/profile.entity';
import { devtools } from 'zustand/middleware';

export type UserProfile = UserEntity & {
  profile: ProfileEntity;
};

type useAuthStore = {
  user: UserProfile | null;
  isLoading: boolean;
  setUser: (payload: UserProfile) => void;
  logout: () => void;
  startLoading: () => void;
  stopLoading: () => void;
};
export const useAuthStore = create<useAuthStore>()(
  devtools((set) => ({
    user: null,
    isLoading: true,
    token: null,
    setUser: (payload: UserProfile) =>
      set((state) => ({
        user: { ...state.user, ...payload },
        isLoading: false,
      })),
    logout: () => set(() => ({ user: null, isLoading: false })),
    startLoading: () => set({ isLoading: true }),
    stopLoading: () => set({ isLoading: false }),
  }))
);
