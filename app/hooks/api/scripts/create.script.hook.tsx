import { useMutation } from "@tanstack/react-query";
import { api } from "../../../api/axios";

export type CreateScriptDto = {
    name: string;
    description?: string;
}

export function useCreateScript() {
    return useMutation({
        mutationFn: async (options: CreateScriptDto) => {
            const { data } = await api.post(
                '/scripts',
                options
            );

            return data;
        }
    })
}