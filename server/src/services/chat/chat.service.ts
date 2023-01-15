import { Conversation } from "../../models/conversation.model";
import { Message } from "../../models/message.model";
import { User } from "../../models/user.model";

export const chat = (io: any) => {

    io.on('connection', async (socket: any) => {
        console.log(`Client connected: ${socket.id}`);
    })
}