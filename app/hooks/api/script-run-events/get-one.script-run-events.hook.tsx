import { useCallback } from "react";
import { createSocketDataSource } from "../../../utils/datasource/socket.datasource";
import { io } from "socket.io-client";
import { useBackendConfigStore } from "../../../stores/backend-config.store";
import { useAuthStore } from "../../../stores/auth.store";

export const ScriptRunStatuses = ['Unknown', 'Queued', 'Running', 'Succeeded', 'Failed', 'Cancelled'] as const;

export type ScriptRunStatus = typeof ScriptRunStatuses[number];

export type ScriptRunEventDto = {
  type: 'status',
  status: ScriptRunStatus
} | {
  type: 'resultUpdate',
  change: {
    type: 'partial' | 'full',
    data: Record<string, unknown>
  }
} | {
  type: 'log',
  log: {
    type: 'info' | 'warn' | 'error',
    message: string
  }
}

export function useGetOneScriptRunEvent() {
    const dataSourceProvider = useCallback((runId: string) => 
        {
            const baseUrl = useBackendConfigStore.getState().baseUrl;
            const accessToken = useAuthStore.getState().accessToken;
            const socket = io(`${baseUrl}/runs`, {
                withCredentials: true,
                transports: ['polling', 'websocket'],
                auth: {
                  token: accessToken 
                }
            });

            const connect = () => socket.emit('subscribeRun', { runId: runId });
            socket.on('connect', connect);
            socket.connect();

            const datasource = createSocketDataSource<ScriptRunEventDto>({
                socket: socket,
                eventName: 'runEvent'
            })

            return {
                subscribe: (listener: (data: ScriptRunEventDto) => void, error?: (reason: string) => void) => {
                    const unsubscribe = datasource.subscribe(listener, error);

                    return () => {
                        unsubscribe();
                        socket.off('connect', connect);
                        socket.disconnect();
                    }
                },
                invalidate: () => datasource.invalidate()
            }
        }, 
    []);

    return dataSourceProvider;
}