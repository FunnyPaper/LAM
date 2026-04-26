import { ScriptResource } from "@lam/frontend";
import { useMemo } from "react";
import { useGetOneScript } from "../hooks/api/scripts/get-one.script.hook";
import { useCreateScript } from "../hooks/api/scripts/create.script.hook";
import { useUpdateScript } from "../hooks/api/scripts/update.script.hook";
import { useRemoveScript } from "../hooks/api/scripts/remove.script.hook";
import { useGetSchema } from "../hooks/api/scripts/get-schema.hook";
import { useGetAllScripts } from "../hooks/api/scripts/get-all.script.hook";

export function useScriptResource(): ScriptResource {
    const getOne = useGetOneScript();
    const getAll = useGetAllScripts();
    const getSchema = useGetSchema();
    const { mutateAsync: create } = useCreateScript();
    const { mutateAsync: update } = useUpdateScript();
    const { mutateAsync: remove } = useRemoveScript();

    const resource: ScriptResource = useMemo(() => ({
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
            },
            include: params?.include
        }),
        create: (params) => create({
            name: params.name,
            ...(params.description && { description: params.description })
        }),
        update: (scriptId, data) => update({ ...data, scriptId }),
        remove: (scriptId) => remove({ scriptId }),
        getJsonSchema: getSchema
    }), [update]);

    return resource;
}