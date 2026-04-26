import { useMutation } from "@tanstack/react-query";
import { api } from "../../../api/axios";

export type RegisterDto = {
    username: string;
    password: string;
}

export function useRegister() {
    return useMutation({
        mutationFn: async (options: RegisterDto) => {
            const { data } = await api.post(
                '/auth/register',
                options
            );

            return data;
        }
    })
}