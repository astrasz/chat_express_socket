import jwt, { TokenExpiredError } from "jsonwebtoken";
import { JWT } from "../../config/config";
import { Conversation } from "../../models/conversation.model";
import { Participation } from "../../models/participation.model";
import { User } from "../../models/user.model";
const { secret } = JWT;

export const chat = (io: any) => {

    const clients: any = {}
    io.on('connection', async (socket: any) => {
        if (socket.connected === true) {
            const token = socket.handshake.headers.token.split(' ')[1];
            try {
                const currentUser = await <any>jwt.verify(token ?? '', secret ?? '');

                clients[currentUser.id] = socket;

                const conversations = await Conversation.findAll({
                    attributes: ['_id'],
                    include: [
                        {
                            model: User, as: 'participants', where: {
                                _id: currentUser.id
                            },
                            attributes: [],
                            required: true,
                        }
                    ]
                });

                for (const c of conversations) {
                    if (c instanceof Conversation) {
                        socket.join(c._id);
                    }
                }

                console.log('clients', Object.keys(clients).length);
                console.log(`Client connected: ${socket.id}`);
                console.log(`Client userId ${currentUser.id}`)


                socket.on('disconnectUser', (socket: any) => {
                    delete clients[currentUser.id]
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