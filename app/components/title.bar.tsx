import { Close, CropSquare, Minimize, SystemUpdate } from "@mui/icons-material";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import { getVersion } from "@tauri-apps/api/app";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

type TitleBarProps = {
  onCheckUpdate: () => void;
}

export function TitleBar({ onCheckUpdate }: TitleBarProps) {
  const appWindow = useMemo(() => getCurrentWindow(), [getCurrentWindow]);
  const handleMinimize = () => appWindow.minimize();
  const handleMaximize = () => appWindow.toggleMaximize();
  const handleClose = () => appWindow.close();
  const [version, setVersion] = useState<string>();

  const { t } = useTranslation('app');

  useEffect(() => {
    getVersion().then(setVersion);
  }, []);

  return (
    <AppBar
      position="static"
      onContextMenu={(e) => e.preventDefault()}
      sx={(theme) => ({
        userSelect: 'none',
        backgroundColor: theme.palette.grey[900],
        color: theme.palette.getContrastText(theme.palette.grey[900]),
        zIndex: 9999
      })}>
      <Toolbar variant='dense' disableGutters sx={{ minHeight: 32 }}>
        <Typography variant="subtitle2" sx={{ pointerEvents: 'none', ml: 1 }}>
          LAM (prototype) {version}
        </Typography>

        <Box data-tauri-drag-region sx={{ flex: 1, height: '100%' }} />

        <IconButton size='small' color="inherit" onClick={onCheckUpdate} title={t('titleBar.checkUpdate')} sx={(theme) => ({
          borderRadius: 0,
          '&:hover': {
            color: theme.palette.getContrastText(theme.palette.grey[700]),
            backgroundColor: theme.palette.grey[700]
          }
        })}>
          <SystemUpdate fontSize="small" />
        </IconButton>

        <IconButton size="small" color="inherit" onClick={handleMinimize} sx={(theme) => ({
          borderRadius: 0,
          '&:hover': {
            color: theme.palette.getContrastText(theme.palette.grey[700]),
            backgroundColor: theme.palette.grey[700]
          }
        })}>
          <Minimize fontSize="small" />
        </IconButton>

        <IconButton size="small" color="inherit" onClick={handleMaximize} sx={(theme) => ({
          borderRadius: 0,
          '&:hover': {
            color: theme.palette.getContrastText(theme.palette.grey[700]),
            backgroundColor: theme.palette.grey[700]
          }
        })}>
          <CropSquare fontSize="small" />
        </IconButton>

        <IconButton
          size="small"
          color="inherit"
          onClick={handleClose}
          sx={(theme) => ({
            borderRadius: 0,
            '&:hover': {
              color: theme.palette.error.contrastText,
              backgroundColor: theme.palette.error.main
            }
          })}>
          <Close fontSize="small" />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}