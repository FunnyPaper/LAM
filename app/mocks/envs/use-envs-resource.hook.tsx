import { EnvResource } from '@lam/frontend';
import { envStore } from './envStore';

export function useEnvResourceHook(): EnvResource {
  const {
    getOne: getOneEnv,
    getAll: getAllEnvs,
    create: createEnv,
    update: updateEnv,
    remove: removeEnv,
  } = envStore();

  return {
    getOne: getOneEnv,
    getAll: getAllEnvs,
    create: createEnv,
    update: updateEnv,
    remove: removeEnv,
  };
}
