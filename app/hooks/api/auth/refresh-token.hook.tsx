import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../api/axios";
import { useAuthStore } from "../../../stores/auth.store";

const PROFILE_QUERY_KEY = ['users', 'me'];

export function useRefreshToken() {
    const setAccessToken = useAuthStore(state => state.setAccessToken);
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async () => {
            const { data } = await api.post('/auth/refresh-token');

            return data;
        },
        onSuccess: (data) => {
            setAccessToken(data.accessToken);
            queryClient.invalidateQueries({ queryKey: PROFILE_QUERY_KEY });
        },
        onError: () => {
            queryClient.removeQueries({ queryKey: PROFILE_QUERY_KEY });
        }
    })
}