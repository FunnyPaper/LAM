import { useMutation } from "@tanstack/react-query";
import { api } from "../../../api/axios";

export type UpdateEnvDto = {
    envId: string;
    name?: string;
    description?: string;
    data?: Record<string, any>;
}

export function useUpdateEnv() {
    return useMutation({
        mutationFn: async ({ envId, ...options }: UpdateEnvDto) => {
            const { data } = await api.put(
                `/users/me/envs/${envId}`,
                options
            );

            return data;
        }
    })
}