import { EnvResource } from "@lam/frontend";
import { useMemo } from "react";
import { useGetOneEnv } from "../hooks/api/envs/get-one.env.hook";
import { useGetAllEnvs } from "../hooks/api/envs/get-all.env.hook";
import { useCreateEnv } from "../hooks/api/envs/create.env.hook";
import { useUpdateEnv } from "../hooks/api/envs/update.env.hook";
import { useRemoveEnv } from "../hooks/api/envs/remove.env.hook";

export function useEnvsResource(): EnvResource {
    const getOne = useGetOneEnv();
    const getAll = useGetAllEnvs();
    const { mutateAsync: create } = useCreateEnv();
    const { mutateAsync: update } = useUpdateEnv();
    const { mutateAsync: remove } = useRemoveEnv();

    const resource: EnvResource = useMemo(() => ({
        getOne: getOne,
        getAll: (params) => getAll({
            pagination: { 
                limit: (params?.limit ?? 1),
                page: (params?.page ?? 0) + 1
            },
            filtering: {
                ...(params?.filter?.name && {name: params?.filter?.name})
            },
            sorting: {
                sortBy: params?.sort?.field ?? 'name',
                order: params?.sort?.order?.toUpperCase() ?? 'ASC'
            }
        }),
        create: (params) => create({
            name: params.name,
            ...(params.description && { description: params.description }),
            data: params.data
        }),
        update: (envId, data) => update({ ...data, envId }),
        remove: (envId) => remove({ envId }),
    }), [update]);

    return resource;
}