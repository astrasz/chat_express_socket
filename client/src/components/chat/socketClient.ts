import { io } from "socket.io-client";

const getToken = () => {
    const user = JSON.parse(sessionStorage.getItem('user') ?? '');
    return user.token ?? null
}

const url = window.location.protocol + '\\' + window.location.host
let socket: any;
export const setConnection = () => {
    socket = io(url, {
        autoConnect: false,
        transportOptions: {
            polling: {
                extraHeaders: {
                    token: getToken()
                }
            }
        }
    })

    socket.on('connect', () => console.log('Connection established'));
    socket.on('disconnect', () => console.log('Connection ended'))
    socket.open();
}