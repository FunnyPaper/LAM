import { ScriptRunResource } from '@lam/frontend';
import { scriptRunStore } from './scriptRunStore';

export function useScriptRunResourceHook(): ScriptRunResource {
  const {
    getOne: getOneScriptRun,
    getAll: getAllScriptRuns,
    cancel: cancelScriptRun,
    create: createScriptRun,
    reexecute: reexecuteScriptRun,
    remove: removeScriptRun,
  } = scriptRunStore();

  return {
    getOne: getOneScriptRun,
    getAll: getAllScriptRuns,
    cancel: cancelScriptRun,
    create: createScriptRun,
    reexecute: reexecuteScriptRun,
    remove: removeScriptRun,
  };
}
