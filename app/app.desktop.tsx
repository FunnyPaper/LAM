import { StrictMode } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { Provider as NiceModalProvider } from '@ebay/nice-modal-react';
import { AppThemeProvider } from '@lam/frontend';
import { queryClient } from './api/query-client';
import { DesktopShell } from './shells/desktop.shell';

export function AppDesktop() {
    return (
        <StrictMode>
            <QueryClientProvider client={queryClient}>
                <AppThemeProvider>
                    <NiceModalProvider>
                        <DesktopShell />
                    </NiceModalProvider>
                </AppThemeProvider>
            </QueryClientProvider>
        </StrictMode>
    );
}
