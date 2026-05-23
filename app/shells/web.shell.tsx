import { App } from '@lam/frontend';
import { useEffect } from 'react';
import { useRefreshToken } from '../hooks/api/auth/refresh-token.hook';
import { useAuthResource } from '../resources/auth.resource.hook';
import { useEnvsResource } from '../resources/envs.resource.hook';
import { useScriptRunEventResource } from '../resources/script-run-events.resource.hook';
import { useScriptRunResource } from '../resources/script-runs.resource.hook';
import { useScriptVersionResource } from '../resources/script-versions.resource.hook';
import { useScriptResource } from '../resources/scripts.resource.hook';
import { useUsersResource } from '../resources/users.resource.hook';
import { useAuthStore } from '../stores/auth.store';
import { useBackendConfigStore } from '../stores/backend-config.store';

export function WebShell() {
  const authResource = useAuthResource();
  const usersResource = useUsersResource();
  const envsResource = useEnvsResource();
  const scriptResource = useScriptResource();
  const scriptVersionResource = useScriptVersionResource();
  const scriptRunResource = useScriptRunResource();
  const scriptRunEventsResource = useScriptRunEventResource();

  const setBaseUrl = useBackendConfigStore(state => state.setBaseUrl);
  const authState = useAuthStore(state => state.authState);
  const storeLogout = useAuthStore(state => state.logout);
  const { mutateAsync: refreshToken } = useRefreshToken();

  useEffect(() => {
    const init = async () => {
      setBaseUrl('3000');
      try {
        await refreshToken();
      } catch {
        storeLogout();
      }
    };
    init();
  }, [refreshToken, storeLogout, setBaseUrl]);

  return (
    <App
      authState={authState}
      apiProviders={{
        auth: authResource,
        user: usersResource,
        env: envsResource,
        script: scriptResource,
        scriptVersion: scriptVersionResource,
        scriptRun: scriptRunResource,
        scriptRunEvent: scriptRunEventsResource,
      }}
    />
  );
}
