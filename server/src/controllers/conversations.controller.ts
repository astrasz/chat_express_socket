import { Response } from "express";
import { Conversation } from "../models/conversation.model";
import { Participation } from "../models/participation.model";
import { User } from "../models/user.model";
import { VerifiedRequest } from "../utils/checkToken";


const conversationsFilters = (partnerId: any) => {
    let filters = {};

    if (partnerId !== '') {
        filters = {
            include: [{
                model: User,
                attributes: ['_id', 'username'],
                where: {
                    _id: partnerId
                }, required: true
            }],
        }
    }
    return filters;
}


export const getConversations = async (req: VerifiedRequest, res: Response) => {

    const userId = req.decodedToken.id;
    const partnerId = req.query.partner;

    if (userId === partnerId) {
        return res.status(400).json('Conversation should be established beetwen diffrent users')
    }

    const user = await User.findByPk(userId);
    const conversations = await user?.$get('conversations', { ...conversationsFilters(partnerId) });


    if (conversations && conversations.every(conversation => conversation instanceof Conversation) === false) {
        return res.status(400).json({ message: 'Conversations cannot be fetched' })
    }

    return res.status(200).json(conversations);
}

export const createConversation = async (req: VerifiedRequest, res: Response) => {

    const userId = req.decodedToken.id;
    const { partnerId } = req.body;

    if (userId === partnerId) {
        return res.status(400).json('Conversation should be established beetwen diffrent users')
    }

    if (partnerId === null) {
        return res.status(400).json({ message: 'Conversation cannot be created' })
    }

    const newConversation = await Conversation.create();
    newConversation.$add('participants', userId);
    newConversation.$add('participants', partnerId);
    await newConversation.save();

    const conversation = await Conversation.findByPk(newConversation._id);

    if (!conversation) {
        return res.status(400).json({ message: 'Conversation cannot be found' })
    }

    return res.status(200).json(conversation);

}