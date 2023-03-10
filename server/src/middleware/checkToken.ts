import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT } from "../config/config";
import { User } from "../models/user.model";
const { secret } = JWT;


export interface VerifiedRequest extends Request {
    decodedToken: any
}


export const checkToken = async (req: VerifiedRequest, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;
    const token = authorization?.split(' ')[1];
    if (token === undefined) {
        return res.status(403).send({ auth: false, message: 'Authorization failed' });
    }
    try {

        if (token === null) return res.status(403).send({ auth: false, message: 'Authorization failed' });
        const decodedToken = await <any>jwt.verify(token ?? '', secret ?? '');
        const userId = decodedToken.id
        const user = await User.findByPk(userId);

        if (user === null) return res.status(403).send({ auth: false, message: 'Authorization failed' });
        const lastLogout = user.toJSON().lastLogout;

        if (lastLogout !== null && lastLogout.getTime() / 1000 > decodedToken.iat) return res.status(403).send({ auth: false, message: 'Authorization failed' });

        req.decodedToken = decodedToken;
        next();

    } catch (err: any) {
        console.log('err: ', err.message)
        return res.status(403).send({ auth: false, message: 'Authorization failed' });
    }

}