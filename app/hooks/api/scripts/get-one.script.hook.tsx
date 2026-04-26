import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { createQueryDataSource } from "../../../utils/datasource/query.datasource";

export type ScriptDto = {
    id: string;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
}

export function useGetOneScript() {
    const queryClient = useQueryClient();

    const dataSourceProvider = useCallback((scriptId: string) => 
        createQueryDataSource<ScriptDto>({
            queryClient,
            queryKey: ['scripts', scriptId],
            endpoint: `scripts/${scriptId}`
        }), 
    []);

    return dataSourceProvider;
}