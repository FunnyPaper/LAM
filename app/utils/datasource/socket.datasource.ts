import { DataSource } from "@lam/frontend";
import { Socket } from "socket.io-client";

export type CreateSocketDataSource = {
    socket: Socket;
    eventName: string;
}

export function createSocketDataSource<T>({
    socket,
    eventName
}: CreateSocketDataSource): DataSource<T> {
    return {
        subscribe: (resolve, reject) => {
            socket.on(eventName, resolve);

            const errorHandler = (err: any) => {
                reject?.(err?.message || 'Socket Error');
            };
            socket.on('error', errorHandler);

            return () => {
                socket.off(eventName, resolve);
                socket.off('error', errorHandler);
            }
        },
        invalidate: () => Promise.resolve()
    }
}