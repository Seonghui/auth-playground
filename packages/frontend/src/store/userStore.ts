import { IUser } from '@/src/types/api';
import { create } from 'zustand';
import { persist, devtools, createJSONStorage } from 'zustand/middleware';

export interface IUserStore {
  user: IUser | null;
  setUser: (user: IUser) => void;
  resetUser: () => void;
}

const store = (set: any) => ({
  user: null,
  setUser: (user: IUser) => {
    set({ user: user });
  },
  resetUser: () => {
    set({ user: null });
  },
});

const useUserStore = create(
  devtools(
    persist(store, {
      name: 'user', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }),
  ),
);

export default useUserStore;
