import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { createQueryDataSource } from "../../../utils/datasource/query.datasource";
import { z } from 'zod';

export type SchemaDto = z.core.JSONSchema.JSONSchema

export function useGetSchema() {
    const queryClient = useQueryClient();

    const dataSourceProvider = useCallback((version: string) => 
        createQueryDataSource<SchemaDto>({
            queryClient,
            queryKey: ['scripts', "validation-schema", version],
            endpoint: `scripts/validation-schema/${version}`
        }), 
    []);

    return dataSourceProvider;
}