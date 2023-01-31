import { Response } from "express";
import { Conversation } from "../models/conversation.model";
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
    try {

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

    } catch (err) {
        console.log(err);
    }

}

export const createConversation = async (req: VerifiedRequest, res: Response) => {
    try {
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
    } catch (err) {
        console.log(err);
    }


}

export const getMessagesByConversationId = async (req: VerifiedRequest, res: Response) => {

    try {
        const conversationId = req.params.id;

        if (conversationId === '') {
            return res.status(400).json({ message: 'Conversation cannot be found' });
        }

        const conversation = await Conversation.findByPk(conversationId);

        if (!conversation) {
            return res.status(400).json({ message: 'Conversation cannot be found' });
        }


        const messages = await conversation.$get('messages', {
            include: { model: User, as: 'sender', attributes: ['_id', 'avatar'] }
        });

        const mappedMessages = messages.map(message => {
            return {
                avatar: message.sender.avatar,
                text: message.content,
                date: message.createdAt,
                senderId: message.sender.id
            }
        })

        return res.status(200).json(mappedMessages);
    } catch (err) {
        console.log(err);
    }
}

export const addMessageToConversation = async () => {

}