import { Request, Response } from "express";
import { User } from "../models/user.model";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT } from "../config/config";
import { VerifiedRequest } from "../utils/checkToken";

export const signup = async (req: Request, res: Response): Promise<Response<string>> => {

    const { email, username, password, repeatedPassword } = req.body;

    if (username === null) return res.status(400).json({ message: 'Username is required' });

    const prevUser: User | null = await User.findOne({ where: { email } })
    if (prevUser) return res.status(400).json({ message: 'Cannot sign up with this email' })

    if (password !== repeatedPassword) return res.status(400).json({ message: 'Password and repetead password are diffrent' })
    try {
        const salt = await bcrypt.genSalt(10); //saltRounds
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = await User.create({
            email,
            username,
            password: hashedPassword,
        });

        return res.status(200).json({ success: true, message: `User ${user.toJSON().email} has been created successfully` });

    } catch (err) {
        console.log('Err: ', err)
        return res.status(400).json({ message: 'User cannot be created' });
    }
};

export const login = async (req: Request, res: Response): Promise<Response<string>> => {
    const { login, password } = req.body;

    const user = await User.findOne({
        where: {
            email: login
        }
    })

    if (user === null) return res.status(403).send({ message: 'Authentication failed, check credentials' });

    const passwordChecked = await bcrypt.compare(password, user.toJSON().password)
    if (passwordChecked === false) return res.status(403).send({ message: 'Authentication failed, check credentials' });

    const expConfig = +(JWT.exp ?? 18000000)

    const hours = expConfig / 1000 / 60 / 60
    const iat = new Date();
    const exp = iat.setHours(iat.getHours() + hours);
    const token = jwt.sign({
        id: user._id,
        iat: iat.getTime() / 1000,
        exp: exp
    }, JWT.secret ?? '')

    user.lastLogin = new Date();
    await user.save();

    return res.status(200).json({
        success: true,
        data: {
            id: user._id,
            email: user.email,
            token
        }
    });
}

export const logout = async (req: VerifiedRequest, res: Response) => {
    const _id = req.decodedToken.id
    await User.update({ lastLogout: new Date() }, {
        where: {
            _id
        }
    })
    res.status(200).send({ success: true, message: 'Log out successfully' });
}