import io, { Socket } from "socket.io-client";

let socket: Socket;

export const initiateSocketConnection = (userId: string) => {
  socket = io(process.env.NEXT_PUBLIC_BASE_SERVER_URL, {
    query: { userId },
  });
};

export const disconnectSocket = () => {
  if (socket) socket.disconnect();
};

export const getSocket = () => socket;
