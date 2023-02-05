import { NextFunction, Request, Response } from "express";
import { User } from "../models/user.model";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT } from "../config/config";
import { VerifiedRequest } from "../middleware/checkToken";

export const signup = async (req: Request, res: Response, next: NextFunction): Promise<Response<string> | void> => {
    try {
        const { email, username, password, repeatedPassword, avatar } = req.body;

        if (username === null) return res.status(400).json({ message: 'Username is required' });

        const prevUser: User | null = await User.findOne({ where: { email } })
        if (prevUser) return res.status(400).json({ message: 'Cannot sign up with this email' })

        if (password !== repeatedPassword) return res.status(400).json({ message: 'Password and repetead password are diffrent' })

        const salt = await bcrypt.genSalt(10); //saltRounds
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = await User.create({
            email,
            username,
            password: hashedPassword,
            avatar
        });

        return res.status(200).json({ success: true, message: `User ${user.toJSON().username} has been created successfully` });

    } catch (err) {
        next(err);
        // return res.status(400).json({ message: 'User cannot be created' });
    }
};

export const login = async (req: Request, res: Response, next: NextFunction): Promise<Response<string> | void> => {
    try {
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

        const hours = expConfig / 1000 / 60 / 60;
        const token = jwt.sign({
            id: user._id,
            username: user.username,
            avatar: user.avatar
        }, JWT.secret ?? '', { expiresIn: `${hours}h` })

        user.lastLogin = new Date();
        await user.save();

        return res.status(200).json({
            success: true,
            data: {
                id: user._id,
                email: user.email,
                avatar: user.avatar,
                token
            }
        });
    } catch (err) {
        next(err);
    }

}

export const logout = async (req: VerifiedRequest, res: Response, next: NextFunction): Promise<Response<string> | void> => {
    try {
        const _id = req.decodedToken.id
        await User.update({ lastLogout: new Date() }, {
            where: {
                _id
            }
        })
        res.status(200).send({ success: true, message: 'Log out successfully' });
    } catch (err) {
        next(err)
    }

}