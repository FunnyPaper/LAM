import { AuthResource } from "@lam/frontend";
import { useMemo } from "react";
import { useLogin } from "../hooks/api/auth/login.hook";
import { useLogout } from "../hooks/api/auth/logout.hook";
import { useRegister } from "../hooks/api/auth/register.hook";

export function useAuthResource(): AuthResource {
    const { mutateAsync: login } = useLogin();
    const { mutateAsync: logout } = useLogout();
    const { mutateAsync: register } = useRegister();

    const resource: AuthResource = useMemo(() => ({
        login: async (data) => {
            await login(data)
        },
        logout: logout,
        register: register
    }), [login, logout, register]);

    return resource;
}