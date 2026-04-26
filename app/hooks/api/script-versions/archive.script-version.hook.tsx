import { useMutation } from "@tanstack/react-query";
import { api } from "../../../api/axios";

export type ArchiveScriptVersionDto = {
    scriptId: string;
    scriptVersionId: string;
}

export function useArchiveScriptVersion() {
    return useMutation({
        mutationFn: async ({ scriptId, scriptVersionId }: ArchiveScriptVersionDto) => {
            const { data } = await api.patch(
                `/scripts/${scriptId}/versions/${scriptVersionId}/archive`
            );

            return data;
        }
    })
}