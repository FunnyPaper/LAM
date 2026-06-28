import { StrictMode } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { Provider as NiceModalProvider } from '@ebay/nice-modal-react';
import { AppThemeProvider } from '@lam/frontend';
import { queryClient } from './api/query-client';
import { WebShell } from './shells/web.shell';

export function AppWeb() {
    return (
        <StrictMode>
            <QueryClientProvider client={queryClient}>
                <AppThemeProvider>
                    <NiceModalProvider>
                        <WebShell />
                    </NiceModalProvider>
                </AppThemeProvider>
            </QueryClientProvider>
        </StrictMode>
    );
}
