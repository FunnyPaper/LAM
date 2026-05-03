import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { createQueryDataSource } from "../../../utils/datasource/query.datasource";
import { Paginated } from "@lam/frontend";

export enum ScriptVersionStatusEnum {
    Draft = "Draft",
    Published = "Published",
    Archieved = "Archived"
}

export enum ScriptSourceFormatEnum {
    Json = "json"
}

export type ScriptVersionDto = {
    id: string;
    content: {
        astJson: Record<string, any>;
        astVersion: number;
        engineVersion: number;
        createdAt: string;
        updatedAt: string;
    };
    source: {
        format: ScriptSourceFormatEnum,
        content: string;
        createdAt: string;
        updatedAt: string;
    };
    versionNumber: number;
    status: ScriptVersionStatusEnum;
    createdAt: string;
    updatedAt: string;
}

export type GetAllScriptVersionDtoQueryParams = {
    sorting?: {
        sortBy: string;
        order: string;
    },
    filtering?: {
        source?: {
            format: 'json';
        },
        content?: {
            engineVersion?: number;
        },
        status?: ScriptVersionStatusEnum;
        runId?: string;
    },
    pagination?: {
        page?: number;
        limit?: number;
    }
}

export function useGetAllScriptVersion() {
    const queryClient = useQueryClient();

    const dataSourceProvider = useCallback((scriptId: string, queryParams: GetAllScriptVersionDtoQueryParams) => 
        createQueryDataSource<Paginated<ScriptVersionDto>>({
            queryClient,
            queryKey: ['scripts', scriptId, "versions"],
            endpoint: `scripts/${scriptId}/versions`,
            queryParams: queryParams
        }), 
    []);

    return dataSourceProvider;
}