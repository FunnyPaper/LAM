import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

export type UseSocketIOProps = {
    url: string,
    roomId: string;
    eventName: string;
}

export function useSocketIO({ url, roomId, eventName }: UseSocketIOProps) {
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        if (!url) return;
        const socket = io(url, {
            withCredentials: true
        });

        const connect = () => socket.emit(eventName, roomId);
        socket.on('connect', connect);
        socket.connect();

        setSocket(socket);

        return () => {
            socket.off('connect', connect);
            socket.disconnect();
        }
    }, [url, roomId, setSocket]);

    return { socket }
}