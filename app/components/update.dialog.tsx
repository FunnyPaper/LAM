import { Update } from "@tauri-apps/plugin-updater";
import { DialogStep } from "../hooks/use-updater.hook"
import { Box, Button, Dialog, DialogContent, DialogTitle, LinearProgress, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

type UpdateDialogProps = {
  step: DialogStep;
  updateData: Update | null;
  progress: number;
  onDownload: () => void;
  onInstall: () => void;
  onCancel: () => void;
}

export function UpdateDialog({ step, updateData, progress, onDownload, onInstall, onCancel }: UpdateDialogProps) {
  const { t } = useTranslation('app');
  
  return (
    <Dialog open={step != 'idle'} maxWidth='sm' fullWidth>
      <DialogTitle>{t('updateManager.title')}</DialogTitle>
      <DialogContent>
        {step === 'prompt' && (
          <Typography>
            {t('updateManager.updateFound')}: <strong>{updateData?.version}</strong>.
          </Typography>
        )}

        {step === 'downloading' && (
          <Box sx={{ width: '100%', mt: 2 }}>
            <Typography variant="body2" gutterBottom>
              {t('updateManager.downloading')} {Math.round(progress)}%
            </Typography>
            <LinearProgress variant="determinate" value={progress} />
          </Box>
        )}

        {step === 'readyToInstall' && (
          <Typography sx={{ mt: 1 }}>
              {t('updateManager.updateDownloaded')}
          </Typography>
        )}
      </DialogContent>

      <DialogContent>
        {(step === 'prompt' || step === 'readyToInstall') && (
          <Button onClick={onCancel} color="inherit">
            {t('updateManager.maybeLater')}
          </Button>
        )}
        {step === 'prompt' && (
          <Button onClick={onDownload} variant="contained" disableElevation>
            {t('updateManager.startDownloading')}
          </Button>
        )}
        {step === 'readyToInstall' && (
          <Button onClick={onInstall} variant="contained" color="success" disableElevation>
            {t('updateManager.install')}
          </Button>
        )}
      </DialogContent>
    </Dialog>
  )
}