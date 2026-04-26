import { useMutation } from "@tanstack/react-query";
import { api } from "../../../api/axios";

export type CreateEnvDto = {
    name: string;
    description?: string;
    data?: Record<string, any>;
}

export function useCreateEnv() {
    return useMutation({
        mutationFn: async (options: CreateEnvDto) => {
            const { data } = await api.post(
                '/users/me/envs',
                options
            );

            return data;
        }
    })
}