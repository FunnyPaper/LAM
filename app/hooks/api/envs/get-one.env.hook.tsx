import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { createQueryDataSource } from "../../../utils/datasource/query.datasource";

export type EnvDto = {
    id: string;
    name: string;
    description: string;
    data: Record<string, any>;
    createdAt: string;
    updateAt: string;
}

export function useGetOneEnv() {
    const queryClient = useQueryClient();

    const dataSourceProvider = useCallback((envId: string) => 
        createQueryDataSource<EnvDto>({
            queryClient,
            queryKey: ['users', 'me', 'envs', envId],
            endpoint: `users/me/envs/${envId}`
        }), 
    []);

    return dataSourceProvider;
}