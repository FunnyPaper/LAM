import { useMutation } from "@tanstack/react-query";
import { api } from "../../../api/axios";

export type CreateScriptVersionDto = {
    scriptId: string;
    content: {
        astJson: Record<string, any>;
        astVersion: number;
        engineVersion: number;
    },
    source: {
        format: 'json',
        content: string;
    }
}

export function useCreateScriptVersion() {
    return useMutation({
        mutationFn: async ({ scriptId, ...options }: CreateScriptVersionDto) => {
            const { data } = await api.post<{ id: string }>(
                `/scripts/${scriptId}/versions`,
                options
            );

            return data;
        }
    })
}