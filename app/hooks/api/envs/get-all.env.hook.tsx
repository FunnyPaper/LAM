import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { Paginated } from "@lam/frontend";
import { createQueryDataSource } from "../../../utils/datasource/query.datasource";

export type EnvDto = {
    id: string;
    name: string;
    description: string;
    data: Record<string, any>;
    createdAt: string;
    updateAt: string;
}

export type GetAllEnvDtoQueryParams = {
    sorting?: {
        sortBy: string;
        order: string;
    },
    filtering?: {
        name?: string;
    },
    pagination?: {
        page?: number;
        limit?: number;
    }
}

export function useGetAllEnvs() {
    const queryClient = useQueryClient();

    const dataSourceProvider = useCallback((queryParams: GetAllEnvDtoQueryParams) => 
        createQueryDataSource<Paginated<EnvDto>>({
            queryClient,
            queryKey: ['users', 'me', 'envs'],
            endpoint: 'users/me/envs',
            queryParams: queryParams
        }),
    []);

    return dataSourceProvider;
}