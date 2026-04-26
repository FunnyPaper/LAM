import { create } from "zustand";

export type AuthState = "loggedIn" | "loggedOut" | "loading"

export type AuthStore = {
    authState: AuthState,
    accessToken: string | null;
    setAccessToken: (token: string) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
    accessToken: null,
    authState: 'loading',
    setAccessToken: (token) => set({ accessToken: token, authState: 'loggedIn' }),
    logout: () => set({ accessToken: null, authState: 'loggedOut' })
}))