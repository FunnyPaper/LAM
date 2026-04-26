import { useMutation } from "@tanstack/react-query";
import { api } from "../../../api/axios";
import { useAuthStore } from "../../../stores/auth.store";

export type LoginDto = {
    username: string;
    password: string;
}

export function useLogin() {
    const setAccessToken = useAuthStore(state => state.setAccessToken);

    return useMutation({
        mutationFn: async (options: LoginDto) => {
            const { data } = await api.post<{ accessToken: string }>(
                '/auth/login',
                options
            );

            return data;
        },
        onSuccess: (data) => setAccessToken(data.accessToken)
    })
}