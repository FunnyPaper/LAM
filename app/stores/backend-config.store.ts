import { create } from "zustand";

export type BackendConfigStore = {
    baseUrl: string | null,
    setBaseUrl: (port: string) => void
}

export const useBackendConfigStore = create<BackendConfigStore>((set) => ({
    baseUrl: null,
    setBaseUrl: (port) => set({ baseUrl: `http://localhost:${port}` })
}))