import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { Paginated } from "@lam/frontend";
import { createQueryDataSource } from "../../../utils/datasource/query.datasource";

export type ScriptDto = {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export type GetAllScriptDtoQueryParams = {
    sorting?: {
        sortBy: string;
        order: string;
    },
    filtering?: {
        name?: string;
        scriptVersionId?: string;
        runId?: string
    },
    pagination?: {
        page?: number;
        limit?: number;
    },
    include?: ('versions' | 'runs')[]
}

export function useGetAllScripts() {
    const queryClient = useQueryClient();

    const dataSourceProvider = useCallback((queryParams: GetAllScriptDtoQueryParams) =>
        createQueryDataSource<Paginated<ScriptDto>>({
            queryClient,
            queryKey: ['scripts', queryParams],
            endpoint: 'scripts',
            queryParams: queryParams
        }),
    []);

    return dataSourceProvider;
}