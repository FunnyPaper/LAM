import { ScriptResource } from '@lam/frontend';
import { scriptStore } from './scriptStore';

export function useScriptResourceHook(): ScriptResource {
  const {
    getOne: getOneScript,
    getAll: getAllScripts,
    create: createScript,
    remove: removeScript,
    update: updateScript,
    getJsonSchema,
  } = scriptStore();

  return {
    getOne: getOneScript,
    getAll: getAllScripts,
    create: createScript,
    remove: removeScript,
    update: updateScript,
    getJsonSchema: getJsonSchema,
  };
}
