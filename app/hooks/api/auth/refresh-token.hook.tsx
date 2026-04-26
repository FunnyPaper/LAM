import { useMutation } from "@tanstack/react-query";
import { api } from "../../../api/axios";
import { useAuthStore } from "../../../stores/auth.store";

export function useRefreshToken() {
    const setAccessToken = useAuthStore(state => state.setAccessToken);

    return useMutation({
        mutationFn: async () => {
            const { data } = await api.post('/auth/refresh-token');

            return data;
        },
        onSuccess: (data) => setAccessToken(data.accessToken)
    })
}