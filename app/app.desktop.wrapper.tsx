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
import { useUpdater } from './hooks/use-updater.hook';
import { Alert, Box, Snackbar } from '@mui/material';
import { TitleBar } from './components/title.bar';
import { UpdateDialog } from './components/update.dialog';

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

  const {
    updateAvailable,
    dialogStep,
    downloadProgress,
    notification,
    setNotification,
    checkForUpdate,
    downloadUpdate,
    installUpdate,
    cancelUpdate
  } = useUpdater();

  const handleCloseSnackbar = () => setNotification(null);

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
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
      <TitleBar onCheckUpdate={checkForUpdate} />

      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        placeItems: 'center',
        flex: 1,
        minHeight: 0,
        overflow: 'hidden'
      }}>
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
      </Box>

      <UpdateDialog
        step={dialogStep}
        updateData={updateAvailable}
        progress={downloadProgress}
        onDownload={downloadUpdate}
        onInstall={installUpdate}
        onCancel={cancelUpdate}
      />

      <Snackbar
        open={!!notification}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        {notification ? (
          <Alert
            onClose={handleCloseSnackbar}
            severity={notification.severity}
            variant='filled'
            sx={{ width: '100%' }}>
            {notification.msg}
          </Alert>
        ) : undefined}
      </Snackbar>
    </Box>
  );
}
