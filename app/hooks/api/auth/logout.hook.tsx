import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../api/axios";
import { useAuthStore } from "../../../stores/auth.store";

export type LoginDto = {
    username: string;
    password: string;
}

const PROFILE_QUERY_KEY = ['users', 'me'];

export function useLogout() {
    const logout = useAuthStore(state => state.logout);
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async () => {
            const { data } = await api.post('/auth/logout');

            return data;
        },
        onSuccess: () => {
            queryClient.removeQueries({ queryKey: PROFILE_QUERY_KEY });
            logout();
        }
    })
}