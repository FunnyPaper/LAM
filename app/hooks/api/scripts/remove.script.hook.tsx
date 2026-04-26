import { useMutation } from "@tanstack/react-query";
import { api } from "../../../api/axios";

export type RemoveScriptDto = {
    scriptId: string
}

export function useRemoveScript() {
    return useMutation({
        mutationFn: async (options: RemoveScriptDto) => {
            const { data } = await api.delete(
                `/scripts/${options.scriptId}`
            );

            return data;
        }
    })
}