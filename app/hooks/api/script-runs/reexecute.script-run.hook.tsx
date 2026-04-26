import { useMutation } from "@tanstack/react-query";
import { api } from "../../../api/axios";

export type ReexecuteScriptRunDto = {
    scriptRunId?: string;
    envId?: string
}

export function useReexecuteScriptRun() {
    return useMutation({
        mutationFn: async ({ scriptRunId, ...options }: ReexecuteScriptRunDto) => {
            const { data } = await api.post(
                `runs/${scriptRunId}/reexecute`,
                options
            );

            return data;
        }
    })
}