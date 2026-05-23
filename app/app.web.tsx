import { StrictMode } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './api/query-client';
import { WebShell } from './shells/web.shell';

export function AppWeb() {
    return (
        <StrictMode>
            <QueryClientProvider client={queryClient}>
                <WebShell />
            </QueryClientProvider>
        </StrictMode>
    );
}
