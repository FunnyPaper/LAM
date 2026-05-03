import { ScriptVersionResource } from "@lam/frontend";
import { useMemo } from "react";
import { ScriptVersionStatusEnum, useGetOneScriptVersion } from "../hooks/api/script-versions/get-one.script-version.hook";
import { useGetAllScriptVersion } from "../hooks/api/script-versions/get-all.script-version.hook";
import { useForkScriptVersion } from "../hooks/api/script-versions/fork.script-version.hook";
import { usePublishScriptVersion } from "../hooks/api/script-versions/publish.script-version.hook";
import { useCreateScriptVersion } from "../hooks/api/script-versions/create.script-version.hook";
import { useUpdateScriptVersion } from "../hooks/api/script-versions/update.script-version.hook";
import { useRemoveScriptVersion } from "../hooks/api/script-versions/remove.script-version.hook";
import { useArchiveScriptVersion } from "../hooks/api/script-versions/archive.script-version.hook";

export function useScriptVersionResource(): ScriptVersionResource {
    const getOne = useGetOneScriptVersion();
    const getAll = useGetAllScriptVersion();
    const { mutateAsync: fork } = useForkScriptVersion();
    const { mutateAsync: publish } = usePublishScriptVersion();
    const { mutateAsync: archive } = useArchiveScriptVersion();
    const { mutateAsync: create } = useCreateScriptVersion();
    const { mutateAsync: update } = useUpdateScriptVersion();
    const { mutateAsync: remove } = useRemoveScriptVersion();

    const resource: ScriptVersionResource = useMemo(() => ({
        getOne: getOne,
        getAll: (scriptId, params) => getAll(scriptId, {
            pagination: { 
                limit: params?.limit,
                page: (params?.page ?? 0) + 1
            },
            filtering: {
                ...(params?.filter?.status && { status: params.filter.status as ScriptVersionStatusEnum }),
                ...(params?.filter?.format && { source: { format: params.filter.format }}),
                ...(params?.filter?.engineVersion != null && { content: { engineVersion: params.filter.engineVersion }})
            },
            sorting: {
                sortBy: params?.sort?.field ?? 'createdAt',
                order: params?.sort?.order?.toUpperCase() ?? 'ASC'
            }
        }),
        fork: (scriptId, scriptVersionId) => fork({ scriptId, scriptVersionId }),
        publish: (scriptId, scriptVersionId, data) => publish({ scriptId, scriptVersionId, data }),
        archive: (scriptId, scriptVersionId) => archive({ scriptId, scriptVersionId }),
        create: (scriptId, params) => create({
            scriptId,
            ...params
        }),
        update: (scriptId, scriptVersionId, data) => update({ ...data, scriptId, scriptVersionId }),
        remove: (scriptId, scriptVersionId) => remove({ scriptId, scriptVersionId })
    }), [update]);

    return resource;
}