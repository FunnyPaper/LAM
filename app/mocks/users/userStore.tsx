import { UserDto, UpdateUserProvider, GetMeUserProvider, UpdateUserDto } from '@lam/frontend';
import { create } from 'zustand';

type UserStoreState = {
  state: UserDto;
  update: UpdateUserProvider;
  me: GetMeUserProvider;
};

export const userStore = create<UserStoreState>((set, store) => ({
  state: { email: 'email' },
  update: async (data: UpdateUserDto) => set({ state: data as UserDto }),
  me: () => ({
    subscribe: (listener) => {
      const id = setTimeout(() => listener(store().state), 1000);

      return () => clearTimeout(id);
    },
    invalidate: async () => {},
  }),
}));
