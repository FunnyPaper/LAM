import { StrictMode } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './api/query-client';
import { AppDesktopWrapper } from './app.desktop.wrapper';

export function AppDesktop() {
    return (
        <StrictMode>
            <QueryClientProvider client={queryClient}>
                <AppDesktopWrapper />
            </QueryClientProvider>
        </StrictMode>
    );
}
