import { createContext } from "react";
import { io, Socket } from "socket.io-client";
import { SOCKET_URL } from "../lib/api";

interface SocketContextType {
  socket: Socket;
}

let socket;

export const SocketContext = createContext<SocketContextType>({ socket });

export const SocketProvider = ({ children }) => {

  socket = io(SOCKET_URL, {
    transports: ["websocket"],
  });

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  )
};