import { useMutation } from "@tanstack/react-query";
import { api } from "../../../api/axios";

export type PublishScriptVersionDto = {
    scriptId: string;
    scriptVersionId: string;
    data: { name: string };
}

export function usePublishScriptVersion() {
    return useMutation({
        mutationFn: async ({ scriptId, scriptVersionId, ...options }: PublishScriptVersionDto) => {
            const { data } = await api.patch(
                `/scripts/${scriptId}/versions/${scriptVersionId}/publish`,
                options.data
            );

            return data;
        }
    })
}