import { useContext } from "react"
import { SocketContext } from "../context/socket-context"

export const useSocketContext = () => {
    const context = useContext(SocketContext);

    if (!context) {
        throw Error("useAuthContext can only be used inside AuthProvider");
    }

    return context;
}