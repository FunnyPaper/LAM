import { ScriptRunResource } from "@lam/frontend";
import { useMemo } from "react";
import { useGetOneScriptRun } from "../hooks/api/script-runs/get-one.script-run.hook";
import { ScriptRunStatusEnum, useGetAllScriptRuns } from "../hooks/api/script-runs/get-all.script-run.hook";
import { useCancelScriptRun } from "../hooks/api/script-runs/cancel.script-run.hook";
import { useCreateScriptRun } from "../hooks/api/script-runs/create.script-run.hook";
import { useRemoveScriptRun } from "../hooks/api/script-runs/remove.script-run.hook";
import { useReexecuteScriptRun } from "../hooks/api/script-runs/reexecute.script-run.hook";

export function useScriptRunResource(): ScriptRunResource {
    const getOne = useGetOneScriptRun();
    const getAll = useGetAllScriptRuns();
    const { mutateAsync: cancel } = useCancelScriptRun();
    const { mutateAsync: create } = useCreateScriptRun();
    const { mutateAsync: remove } = useRemoveScriptRun();
    const { mutateAsync: reexecute } = useReexecuteScriptRun();

    const resource: ScriptRunResource = useMemo(() => ({
        getOne: getOne,
        getAll: (params) => getAll({
            pagination: { 
                limit: params?.limit,
                page: (params?.page ?? 0) + 1
            },
            filtering: {
                ...(params?.filter?.status && { status: params.filter.status as ScriptRunStatusEnum }),
            },
            sorting: {
                sortBy: params?.sort?.field ?? 'status',
                order: params?.sort?.order?.toUpperCase() ?? 'ASC'
            }
        }),
        cancel: (scriptRunId) => cancel({ scriptRunId }),
        create,
        remove: (scriptRunId) => remove({ scriptRunId }),
        reexecute: (scriptRunId) => reexecute({ scriptRunId })
    }), []);

    return resource;
}