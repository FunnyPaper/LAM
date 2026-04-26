import { useUpdateSelf } from "../hooks/api/users/update.self.hook";
import { UserResource } from "@lam/frontend";
import { useMemo } from "react";
import { useGetSelfProfile } from "../hooks/api/users/get.self.hook";

export type UserDto = {
    username: string
}

export function useUsersResource(): UserResource {
    const dataSourceProvider = useGetSelfProfile();
    const update = useUpdateSelf();

    const resource: UserResource = useMemo(() => ({
        update: update.mutateAsync,
        me: dataSourceProvider
    }), [update, dataSourceProvider]);

    return resource;
}