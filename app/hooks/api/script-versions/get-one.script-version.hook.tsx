import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { createQueryDataSource } from "../../../utils/datasource/query.datasource";

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

export function useGetOneScriptVersion() {
    const queryClient = useQueryClient();

    const dataSourceProvider = useCallback((scriptId: string, scriptVersionId: string) => 
        createQueryDataSource<ScriptVersionDto>({
            queryClient,
            queryKey: ['scripts', scriptId, "versions", scriptVersionId],
            endpoint: `scripts/${scriptId}/versions/${scriptVersionId}`
        }), 
    []);

    return dataSourceProvider;
}