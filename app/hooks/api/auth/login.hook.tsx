import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../api/axios";
import { useAuthStore } from "../../../stores/auth.store";

export type LoginDto = {
    username: string;
    password: string;
}

const PROFILE_QUERY_KEY = ['users', 'me'];

export function useLogin() {
    const setAccessToken = useAuthStore(state => state.setAccessToken);
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (options: LoginDto) => {
            const { data } = await api.post<{ accessToken: string }>(
                '/auth/login',
                options
            );

            return data;
        },
        onSuccess: (data) => {
            setAccessToken(data.accessToken);
            queryClient.invalidateQueries({ queryKey: PROFILE_QUERY_KEY });
        }
    })
}