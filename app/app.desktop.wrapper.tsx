import { App } from '@lam/frontend';
import { useEffect } from 'react';
import { useBackendConfigStore } from './stores/backend-config.store';
import { useAuthStore } from './stores/auth.store';
import { useAuthResource } from './resources/auth.resource.hook';
import { useUsersResource } from './resources/users.resource.hook';
import { invoke } from '@tauri-apps/api/core';
import { useRefreshToken } from './hooks/api/auth/refresh-token.hook';
import { useEnvsResource } from './resources/envs.resource.hook';
import { useScriptResource } from './resources/scripts.resource.hook';
import { useScriptVersionResource } from './resources/script-versions.resource.hook';
import { useScriptRunResource } from './resources/script-runs.resource.hook';
import { useScriptRunEventResource } from './resources/script-run-events.resource.hook';

export function AppDesktopWrapper() {
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
        invoke<string>('initialize').then(async (port) => {
            setBaseUrl(port);
            try {
                await refreshToken();
            } catch {
                storeLogout();
            }
        })
    }, [setBaseUrl, storeLogout, refreshToken])

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
