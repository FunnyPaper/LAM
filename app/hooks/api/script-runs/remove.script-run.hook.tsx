import { useMutation } from "@tanstack/react-query";
import { api } from "../../../api/axios";

export type RemoveScriptRunDto = {
    scriptRunId: string;
}

export function useRemoveScriptRun() {
    return useMutation({
        mutationFn: async ({ scriptRunId }: RemoveScriptRunDto) => {
            const { data } = await api.delete(
                `runs/${scriptRunId}`
            );

            return data;
        }
    })
}