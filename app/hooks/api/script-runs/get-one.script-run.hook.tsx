import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { createQueryDataSource } from "../../../utils/datasource/query.datasource";

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
        data?: Record<string, any>[];
        createdAt: string;
        updatedAt: string;
    };
    createdAt: string;
    updatedAt: string;
    finishedAt: string;
}

export function useGetOneScriptRun() {
    const queryClient = useQueryClient();

    const dataSourceProvider = useCallback((scriptRunId: string) => 
        createQueryDataSource<ScriptRunDto>({
            queryClient,
            queryKey: ['runs', scriptRunId],
            endpoint: `runs/${scriptRunId}`
        }), 
    []);

    return dataSourceProvider;
}