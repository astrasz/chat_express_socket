import { Request, Response, Application } from "express";
import { checkToken } from "../utils/checkToken";
import * as authController from "../controllers/auth.controller";
import * as usersController from "../controllers/users.controller";
import * as conversationsController from "../controllers/conversations.controller";
import * as participationsController from "../controllers/participations.controller";
import { Server } from "socket.io";

export const routes = (server: any, io: Server) => {

    server.get('/api', (req: Request, res: Response) => {
        res.send('Client have just been created');
    });
    server.post('/api/signup', authController.signup)
    server.post('/api/login', authController.login)
    server.use('/api/*', checkToken);
    server.get('/api/logout', authController.logout);
    server.get('/api/users', usersController.getUsers);
    server.get('/api/conversations', conversationsController.getConversations);
    server.post('/api/conversations', conversationsController.createConversation)
    server.get('/api/conversations/:id/messages', conversationsController.getMessagesByConversationId)
    server.post('/api/conversations/:id/messages', conversationsController.addMessageToConversation)
    server.put('/api/participations/:id', participationsController.updateParticipation)

}