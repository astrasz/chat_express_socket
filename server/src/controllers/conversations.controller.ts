import { NextFunction, Response } from "express";
import { Conversation } from "../models/conversation.model";
import { User } from "../models/user.model";
import { Message } from "../models/message.model"
import { VerifiedRequest } from "../middleware/checkToken";
import { Participation } from "../models/participation.model";


const conversationsFilters = (partnerId: any, conversationId = '') => {
    let filters = {};

    if (partnerId !== '') {
        filters = {
            include: [{
                model: User,
                attributes: ['_id', 'username', 'avatar'],
                where: {
                    _id: partnerId
                }, required: true
            }],
        }
    }

    if (conversationId !== '') {
        filters = {
            ...filters,
            where: {
                _id: conversationId
            }
        }
    }
    return filters;
}


export const getConversations = async (req: VerifiedRequest, res: Response, next: NextFunction): Promise<Response<string> | void> => {
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
        next(err);
    }

}

export const createConversation = async (req: VerifiedRequest, res: Response, next: NextFunction): Promise<Response<string> | void> => {
    try {
        const userId = req.decodedToken.id;
        const { partnerId, lastChecked } = req.body;

        if (userId === partnerId) {
            return res.status(400).json('Conversation should be established beetwen diffrent users')
        }

        if (partnerId === null || lastChecked === null) {
            return res.status(400).json({ message: 'Conversation cannot be created' })
        }

        const newConversation = await Conversation.create();
        await newConversation.$add('participants', [userId, partnerId]);
        await newConversation.save();

        const participation = await Participation.findOne({
            where: {
                conversationId: newConversation._id,
                userId: userId,
            }
        })

        const partnerParticipation = await Participation.findOne({
            where: {
                conversationId: newConversation._id,
                userId: partnerId,
            }
        })

        if (participation instanceof Participation && partnerParticipation instanceof Participation) {
            partnerParticipation.lastChecked = lastChecked;
            participation.lastChecked = lastChecked;
            await partnerParticipation.save();
            await participation.save();
        } else {
            await newConversation.$remove('participants', [userId, partnerId]);
            await newConversation.destroy();
            return res.status(400).json({ message: 'Conversation cannot be created' })
        }

        const user = await User.findByPk(userId);
        const conversation = await user?.$get('conversations', { ...conversationsFilters(partnerId, newConversation._id) });

        if (Array.isArray(conversation) && !(conversation[0] instanceof Conversation)) {
            return res.status(400).json({ message: 'Conversations cannot be fetched' })
        }

        return res.status(200).json(conversation);
    } catch (err) {
        next(err);
    }
}

export const getMessagesByConversationId = async (req: VerifiedRequest, res: Response, next: NextFunction): Promise<Response<string> | void> => {

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
            include: { model: User, as: 'sender', attributes: ['_id', 'avatar'] }, order: [['createdAt', 'ASC']]
        });

        const mappedMessages = messages.map(message => {
            return {
                avatar: message.sender.avatar,
                text: message.content,
                date: message.createdAt,
                senderId: message.sender._id
            }
        })

        return res.status(200).json(mappedMessages);
    } catch (err) {
        next(err);
    }
}

export const addMessageToConversation = async (req: VerifiedRequest, res: Response, next: NextFunction): Promise<Response<string> | void> => {
    try {
        const senderId = req.decodedToken.id
        const { content } = req.body;
        const conversationId = req.params.id;
        const message = await Message.create({
            content,
            senderId,
        });

        const sender = await User.findByPk(senderId);
        const conversation = await Conversation.findByPk(conversationId);

        if (sender instanceof User && conversation instanceof Conversation && message instanceof Message) {
            await sender.$add('message', message);
            await conversation.$add('message', message);
            await conversation.$set('lastMessage', message);
            conversation.lastMessageId = message._id;
            await conversation.save();
        } else {
            if (message instanceof Message) {
                await message.destroy();
                return res.status(400).json({ message: 'Message cannot be created' })
            }
        }

        return res.status(201).json(message);

    } catch (err: any) {
        next(err);
    }
}