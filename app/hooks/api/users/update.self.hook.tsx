import { useMutation } from "@tanstack/react-query";
import { api } from "../../../api/axios";

export type UpdateUserDto = {
    username?: string,
    password: string
}

export function useUpdateSelf() {
    return useMutation({
        mutationFn: async (options: UpdateUserDto) => {
            const { data } = await api.put(
                '/users/me',
                options
            );

            return data;
        }
    })
}