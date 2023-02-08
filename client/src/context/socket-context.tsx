import { createContext, ReactNode } from 'react'
import { io, Socket } from "socket.io-client";
import { useAuthContext } from "../hooks/useAuthContext";

const url = window.location.protocol + '//' + window.location.host

export interface SocketType {
    socket: Socket
}

export const SocketContext = createContext<SocketType>(
    {} as SocketType
);

export const SocketContextProvider = (props: { children: ReactNode }) => {
    const { user } = useAuthContext();
    const token = user?.token


    const socketInstance = io(url, {
        autoConnect: false,
        withCredentials: true,
        auth: {
            token: `Bearer ${token}`
        }
    })

    socketInstance.emit('connection', () => console.log('Connection established'));
    socketInstance.open();


    return (
        <SocketContext.Provider value={{ socket: socketInstance }}>
            {props.children}
        </SocketContext.Provider>
    )


}

