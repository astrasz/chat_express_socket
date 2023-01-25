import { createContext, useState, ReactNode, Dispatch, SetStateAction, useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { UserInterface } from '../hooks/useAuth'


interface Props {
    children?: ReactNode
}

export type AuthContextType = {
    user: UserInterface | null,
    setUser: Dispatch<SetStateAction<UserInterface | null>>
}

export const AuthContext = createContext<AuthContextType>({
    user: null,
    setUser: (user) => { }
})

export const AuthContextProvider = ({ children }: Props) => {
    const [user, setUser] = useState<UserInterface | null>(null);
    const { getItem } = useLocalStorage()

    useEffect(() => {
        const userAuth = getItem('user')
        if (userAuth) {
            const data = JSON.parse(userAuth);
            setUser(data);
        }
    }, [])

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}