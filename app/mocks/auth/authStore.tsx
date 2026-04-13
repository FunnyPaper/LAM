import { LoginAuthProvider, LogoutAuthProvider } from '@lam/frontend';
import { create } from 'zustand';

type AuthStoreState = {
  state: 'loading' | 'loggedIn' | 'loggedOut';
  login: LoginAuthProvider;
  logout: LogoutAuthProvider;
};

export const authStore = create<AuthStoreState>((set) => ({
  state: 'loading',
  login: async () => set({ state: 'loggedIn' }),
  logout: async () => set({ state: 'loggedOut' }),
}));
