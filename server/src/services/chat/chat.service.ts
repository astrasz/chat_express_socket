import jwt, { TokenExpiredError } from "jsonwebtoken";
import { JWT } from "../../config/config";
const { secret } = JWT;

export const chat = (io: any) => {

    const clients: any = {}
    io.on('connection', async (socket: any) => {
        if (socket.connected === true) {
            const token = socket.handshake.headers.token.split(' ')[1];
            try {
                const currentUser = await <any>jwt.verify(token ?? '', secret ?? '');

                clients[currentUser.id] = socket;

                console.log('clients', Object.keys(clients).length);
                console.log(`Client connected: ${socket.id}`);
                console.log(`Client userId ${currentUser.id}`)


                socket.on('disconnectUser', (socket: any) => {
                    delete clients[currentUser.id]
                    console.log('clients', Object.keys(clients).length);
                    console.log('user disconnected - custom');
                })

                socket.on('disconnect', (socket: any) => {
                    delete clients[currentUser.id]
                    console.log('user disconnected');
                })

                socket.on('joinRoom', (data: any) => {
                    if (data.partnerId in clients) {
                        clients[data.partnerId].join(data.conversationId);
                    }
                    socket.join(data.conversationId);
                })

                socket.on('message', (data: any) => {
                    socket.to(data.conversationId).emit('getMessage', data)
                })
            } catch (err: any) {
                console.log('socket:' + err.message)
            }
        }
    })
}