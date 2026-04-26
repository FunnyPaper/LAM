import { useMutation } from "@tanstack/react-query";
import { api } from "../../../api/axios";

export type UpdateScriptDto = {
    scriptId: string;
    name?: string;
    description?: string;
}

export function useUpdateScript() {
    return useMutation({
        mutationFn: async ({ scriptId, ...options }: UpdateScriptDto) => {
            const { data } = await api.put(
                `/scripts/${scriptId}`,
                options,
            );

            return data;
        }
    })
}