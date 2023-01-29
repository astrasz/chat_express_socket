import { NextFunction, Request, Response } from "express"
import jwt, { JsonWebTokenError } from "jsonwebtoken";
import { JWT } from "../config/config";
import { User } from "../models/user.model";
const { secret } = JWT;


export interface VerifiedRequest extends Request {
    decodedToken: any
}


export const checkToken = async (req: VerifiedRequest, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;
    const token = authorization?.split(' ')[1];

    if (token === null) return res.status(403).send({ auth: false, message: 'Authorization failed3' });
    try {
        const decodedToken = await <any>jwt.verify(token ?? '', secret ?? '');
        const userId = decodedToken.id
        const user = await User.findByPk(userId);

        if (user === null) return res.status(403).send({ auth: false, message: 'Authorization failed2' });
        const lastLogout = user.toJSON().lastLogout

        if (lastLogout !== null && lastLogout > decodedToken.iat) return res.status(403).send({ auth: false, message: 'Authorization failed4' });

        req.decodedToken = decodedToken;
        next();

    } catch (err) {
        return res.status(403).send({ auth: false, message: 'Authorization failed1' });
    }

}