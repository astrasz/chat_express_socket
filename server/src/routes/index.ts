import { Request, Response, Application } from "express";
import { checkToken } from "../utils/checkToken";
import * as authController from "../controllers/auth.controller"
import { Server } from "socket.io";

export const routes = (server: any, io: Server) => {

    server.get('/api', (req: Request, res: Response) => {
        res.send('Client have just been created');
    });
    server.post('/api/signup', authController.signup)
    server.post('/api/login', authController.login)
    server.use('/api/*', checkToken);
    server.get('/api/logout', authController.logout)



}