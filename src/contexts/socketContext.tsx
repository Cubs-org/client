import { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { SOCKET_URL } from "../lib/api";

interface SocketProviderProps {
  children: React.ReactNode;
};

type SocketContextProps = {
  subscribe: (event: string, callback: (data: any) => void) => void;
  unsubscribe: (event: string) => void;
  listener: Socket | null;
};

const SocketContext = createContext<SocketContextProps | undefined>(undefined);

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};

export const SocketProvider = ({ children }: SocketProviderProps) => {
  const [listener, setListener] = useState<Socket | null>(null);

  const subscribe = (event: string, callback: (data: any) => void) => {
    if (listener) listener.on(event, callback);
  };

  const unsubscribe = (event: string) => {
    if (listener) listener.off(event);
  };

  useEffect(() => {
    setListener(io(SOCKET_URL));
  }, []);

  return (
    <SocketContext.Provider value={{ listener, subscribe, unsubscribe }}>
      {children}
    </SocketContext.Provider>
  );
};