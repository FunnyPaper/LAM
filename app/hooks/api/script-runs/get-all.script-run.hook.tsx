import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { createQueryDataSource } from "../../../utils/datasource/query.datasource";
import { Paginated } from "@lam/frontend";

export enum ScriptRunStatusEnum {
    Queued = "Queued",
    Running = "Running",
    Succeeded = "Succeeded",
    Failed = "Failed",
    Cancelled = "Cancelled"
}

export enum ScriptVersionStatusEnum {
    Draft = "Draft",
    Published = "Published",
    Archieved = "Archived"
}

export enum ScriptSourceFormatEnum {
    Json = "json"
}

export type ScriptRunDto = {
    id: string;
    status: ScriptRunStatusEnum;
    scriptVersionSnapshot: {
        status: ScriptVersionStatusEnum;
        versionNumber: number;
        createdAt: string;
        updatedAt: string;
        content: {
            astJson: Record<string, any>;
            astVersion: number;
            engineVersion: number;
            createdAt: string;
            updatedAt: string;
        }; 
        source: {
            content: string;
            format: ScriptSourceFormatEnum;
            createdAt: string;
            updatedAt: string;
        };
    };
    envSnapshot: {
        name: string;
        decription: string;
        data: Record<string, any>;
    };
    result: {
        data?: Record<string, any>;
        createdAt: string;
        updatedAt: string;
    };
    createdAt: string;
    updatedAt: string;
    finishedAt: string;
}

export type GetAllScriptRunsDtoQueryParams = {
    sorting?: {
        sortBy: string;
        order: string;
    },
    filtering?: {
        status?: ScriptRunStatusEnum;
        scriptId?: string;
        scriptVersionId?: string;
        createdAt?: Date;
        updatedAt?: Date;
        finishedAt?: Date;
    },
    pagination?: {
        page?: number;
        limit?: number;
    }
}

export function useGetAllScriptRuns() {
    const queryClient = useQueryClient();

    const dataSourceProvider = useCallback((queryParams: GetAllScriptRunsDtoQueryParams) => 
        createQueryDataSource<Paginated<ScriptRunDto>>({
            queryClient,
            queryKey: ['runs'],
            endpoint: 'runs',
            queryParams: queryParams
        }), 
    []);

    return dataSourceProvider;
}