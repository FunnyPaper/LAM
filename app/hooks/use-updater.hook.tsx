import { invoke } from "@tauri-apps/api/core";
import { relaunch } from "@tauri-apps/plugin-process";
import { check, Update } from "@tauri-apps/plugin-updater";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export type DialogStep = 'idle' | 'prompt' | 'downloading' | 'readyToInstall';
export type UpdaterNotification = {
  msg: string, 
  severity: 'success' | 'error' | 'info'
}

export function useUpdater() {
  const [updateAvailable, setUpdateAvailable] = useState<Update | null>(null);
  const [dialogStep, setDialogStep] = useState<DialogStep>('idle');
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [notification, setNotification] = useState<UpdaterNotification | null>(null);
  const { t } = useTranslation('app');

  const checkForUpdate = async () => {
    try {
      const update = await check();
      if (update) {
        setUpdateAvailable(update);
        setDialogStep('prompt');
      } else {
        setNotification({ msg: t('updater.noNewVersion'), severity: 'info' });
      }
    } catch (error) {
      setNotification({ msg: t('updater.serverConnectionError'), severity: 'error' });
    }
  }

  const downloadUpdate = async () => {
    if (!updateAvailable) return;

    setDialogStep('downloading');
    setDownloadProgress(0);

    let downloaded = 0;
    let total = 0;

    try {
      await updateAvailable.download(event => {
        if (event.event === 'Started') {
          total = event.data.contentLength || 0;
        } else if (event.event === 'Progress') {
          downloaded += event.data.chunkLength;
          if (total > 0) {
            setDownloadProgress((downloaded / total) * 100);
          }
        }
      });
      setDialogStep('readyToInstall');
    } catch (error) {
      setDialogStep('idle');
      setNotification({ msg: t('updater.couldNotDownload'), severity: 'error' });
    }
  }

  const installUpdate = async () => {
    if (!updateAvailable) return;

    try {
      await invoke("shutdown");
      await updateAvailable.install();
      await relaunch();
    } catch(error) {
      setNotification({ msg: t('updater.criticalError'), severity: 'error' });
    }
  }

  const cancelUpdate = () => setDialogStep('idle');

  return {
    updateAvailable,
    dialogStep,
    downloadProgress,
    notification,
    setNotification,
    checkForUpdate,
    downloadUpdate,
    installUpdate,
    cancelUpdate
  }
}