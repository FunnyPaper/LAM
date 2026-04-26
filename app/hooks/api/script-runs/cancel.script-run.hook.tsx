import { useMutation } from "@tanstack/react-query";
import { api } from "../../../api/axios";

export type CancelScriptRunDto = {
    scriptRunId?: string;
}

export function useCancelScriptRun() {
    return useMutation({
        mutationFn: async ({ scriptRunId }: CancelScriptRunDto) => {
            const { data } = await api.patch(
                `runs/${scriptRunId}/cancel`
            );

            return data;
        }
    })
}