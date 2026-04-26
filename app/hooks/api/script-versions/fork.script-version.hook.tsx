import { useMutation } from "@tanstack/react-query";
import { api } from "../../../api/axios";

export type ForkScriptVersionDto = {
    scriptId: string;
    scriptVersionId: string;
}

export function useForkScriptVersion() {
    return useMutation({
        mutationFn: async ({ scriptId, scriptVersionId, ...options }: ForkScriptVersionDto) => {
            const { data } = await api.post(
                `/scripts/${scriptId}/versions/${scriptVersionId}/fork`,
                options
            );

            return data;
        }
    })
}