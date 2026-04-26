import { useMutation } from "@tanstack/react-query";
import { api } from "../../../api/axios";

export type UpdateScriptVersionDto = {
    scriptId: string;
    scriptVersionId: string;
    content?: {
        astJson?: Record<string, any>;
        astVersion?: number;
        engineVersion?: number;
    },
    source?: {
        format?: 'json',
        content?: string;
    }
}

export function useUpdateScriptVersion() {
    return useMutation({
        mutationFn: async ({ scriptId, scriptVersionId, ...options }: UpdateScriptVersionDto) => {
            const { data } = await api.put(
                `/scripts/${scriptId}/versions/${scriptVersionId}`,
                options
            );

            return data;
        }
    })
}