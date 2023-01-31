import { io } from "socket.io-client";

const url = window.location.protocol + '//' + window.location.host
let socket: any;
export const setConnection = (token: string) => {
    socket = io(url, {
        autoConnect: false,
        transportOptions: {
            polling: {
                extraHeaders: {
                    token: `Bearer ${token}`
                }
            }
        }
    })
    socket.emit('connection', () => console.log('Connection established'));
    socket.open();
}

export const joinRoom = (conversationId: string, partnerId: string) => {
    socket.emit('joinRoom', { conversationId, partnerId })
}

export const disconnect = () => {
    socket.emit('disconnectUser', () => {
        console.log('Disconnection');
    })
}