import { useMutation } from "@tanstack/react-query";
import { api } from "../../../api/axios";
import { useAuthStore } from "../../../stores/auth.store";

export type LoginDto = {
    username: string;
    password: string;
}

export function useLogout() {
    const logout = useAuthStore(state => state.logout);

    return useMutation({
        mutationFn: async () => {
            const { data } = await api.post('/auth/logout');

            return data;
        },
        onSuccess: () => logout()
    })
}