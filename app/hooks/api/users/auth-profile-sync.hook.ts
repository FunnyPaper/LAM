import { useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "../../../stores/auth.store";
import { useEffect } from "react";

const PROFILE_QUERY_KEY = ['users', 'me'];

export function useAuthProfileSync() {
    const queryClient = useQueryClient();
    const accessToken = useAuthStore(state => state.accessToken);
    const authState = useAuthStore(state => state.authState);

    useEffect(() => {
        if (accessToken == null || authState === 'loggedOut') {
            queryClient.invalidateQueries({ queryKey: PROFILE_QUERY_KEY });
            queryClient.removeQueries({ queryKey: PROFILE_QUERY_KEY });
        } else if (accessToken != null) {
            queryClient.invalidateQueries({ queryKey: PROFILE_QUERY_KEY });
        }
    }, [accessToken, authState, queryClient]);
}