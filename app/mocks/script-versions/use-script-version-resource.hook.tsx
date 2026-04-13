import { ScriptVersionResource } from '@lam/frontend';
import { scriptVersionStore } from './scriptVersionStore';

export function useScriptVersionResourceHook(): ScriptVersionResource {
  const {
    getOne: getOneScriptVersion,
    getAll: getAllScriptVersions,
    create: createScriptVersion,
    fork: forkScriptVersion,
    publish: publishScriptVersion,
    remove: removeScriptVersion,
    update: updateScriptVersion,
  } = scriptVersionStore();

  return {
    getOne: getOneScriptVersion,
    getAll: getAllScriptVersions,
    create: createScriptVersion,
    fork: forkScriptVersion,
    publish: publishScriptVersion,
    remove: removeScriptVersion,
    update: updateScriptVersion,
  };
}
