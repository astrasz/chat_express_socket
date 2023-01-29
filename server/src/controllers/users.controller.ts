import { Response } from "express";
import { Conversation } from "../models/conversation.model";
import { User } from "../models/user.model";
import { VerifiedRequest } from "../utils/checkToken";

export const getUsers = async (req: VerifiedRequest, res: Response) => {

    const userId = req.decodedToken.id;


    const users = await User.findAndCountAll({
        attributes: ['_id', 'username'],
        include: [{ model: Conversation }]
    })

    return res.status(200).json(users);
}