import { useContext } from 'react';
import { AuthContext } from "../context/auth-context";
import useLocalStorage from './useLocalStorage';

export interface UserInterface {
    id: string,
    email: string,
    token: string
}

export const useAuth = () => {

    const { setUser } = useContext(AuthContext)
    const { setItem, removeItem } = useLocalStorage();


    const logIn = (user: UserInterface) => {
        setUser(user);
        setItem('user', JSON.stringify(user));

    }

    const logOut = () => {
        setUser(null);
        removeItem('user');
    }

    return { logIn, logOut };
}