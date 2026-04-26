import { useMutation } from "@tanstack/react-query";
import { api } from "../../../api/axios";

export type RemoveEnvDto = {
    envId: string
}

export function useRemoveEnv() {
    return useMutation({
        mutationFn: async (options: RemoveEnvDto) => {
            const { data } = await api.delete(
                `/users/me/envs/${options.envId}`
            );

            return data;
        }
    })
}