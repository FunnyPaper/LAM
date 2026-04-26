import { ScriptRunEventResource } from "@lam/frontend";
import { useMemo } from "react";
import { useGetOneScriptRunEvent } from "../hooks/api/script-run-events/get-one.script-run-events.hook";

export function useScriptRunEventResource(): ScriptRunEventResource {
    const getOne = useGetOneScriptRunEvent();

    const resource: ScriptRunEventResource = useMemo(() => ({
        getOne
    }), []);

    return resource;
}