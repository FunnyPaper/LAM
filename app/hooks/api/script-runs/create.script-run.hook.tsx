import { useMutation } from "@tanstack/react-query";
import { api } from "../../../api/axios";

export type CreateScriptRunDto = {
    envId?: string;
    scriptVersionId: string;
}

export function useCreateScriptRun() {
    return useMutation({
        mutationFn: async (options: CreateScriptRunDto) => {
            const { data } = await api.post(
                'runs',
                options
            );

            return data;
        }
    })
}