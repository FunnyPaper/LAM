import { ScriptRunEventResource } from '@lam/frontend';
import { scriptRunEventStore } from './scriptRunEventStore';

export function useScriptRunEventResourceHook(): ScriptRunEventResource {
  const { start: startScriptRunEvents } = scriptRunEventStore();

  return {
    getOne: startScriptRunEvents,
  };
}
