import { useMutation } from "@tanstack/react-query";
import { api } from "../../../api/axios";

export type RemoveScriptVersionDto = {
    scriptId: string;
    scriptVersionId: string;
}

export function useRemoveScriptVersion() {
    return useMutation({
        mutationFn: async ({ scriptId, scriptVersionId }: RemoveScriptVersionDto) => {
            const { data } = await api.delete(
                `/scripts/${scriptId}/versions/${scriptVersionId}`,
            );

            return data;
        }
    })
}