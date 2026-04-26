import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { createQueryDataSource } from "../../../utils/datasource/query.datasource";

export type UserDto = {
    username: string
}

export function useGetSelfProfile() {
    const queryClient = useQueryClient();

    const dataSourceProvider = useCallback(() => 
        createQueryDataSource<UserDto>({
            queryClient,
            queryKey: ['users', 'me'],
            endpoint: 'users/me'
        }), 
    []);

    return dataSourceProvider;
}