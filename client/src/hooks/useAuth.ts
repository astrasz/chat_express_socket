import { useContext } from 'react';
import { AuthContext } from "../context/auth-context";
import useLocalStorage from './useLocalStorage';
import { useSocketContext } from './useSocketContext';

export interface UserInterface {
    id: string,
    email: string,
    avatar: string,
    token: string
}

export const useAuth = () => {

    const { socket } = useSocketContext();
    const { setUser } = useContext(AuthContext)
    const { setItem, removeItem } = useLocalStorage();


    const logIn = (user: UserInterface) => {
        setUser(user);
        setItem('user', JSON.stringify(user));

    }

    const logOut = () => {
        socket.emit('disconnectUser')
        setUser(null);
        removeItem('user');
    }

    return { logIn, logOut };
}