import { Response } from "express";
import { Op, literal } from "sequelize";
import { Conversation } from "../models/conversation.model";
import { Message } from "../models/message.model";
import { Participation } from "../models/participation.model";
import { User } from "../models/user.model";
import { VerifiedRequest } from "../utils/checkToken";

export const getUsers = async (req: VerifiedRequest, res: Response) => {
    try {
        const userId = req.decodedToken.id;

        const users = await User.findAndCountAll({
            attributes: ['_id', 'avatar', 'username'],
            distinct: true,
            where: {
                _id: {
                    [Op.ne]: userId
                }
            },
            include: [{
                model: Conversation,
                attributes: [
                    '_id',
                    'title',
                    [literal(
                        "(SELECT COUNT(*) FROM messages as m LEFT JOIN participations as p ON p.conversationId = m.conversationId WHERE m.conversationId=conversations._id AND m.createdAt > p.lastChecked AND m.senderId=User._id AND p.userId<>User._id)"), 'unread']
                ],
                include: [{
                    model: User, as: 'participants', where: {
                        _id: userId
                    },
                    attributes: [],
                    required: true,
                }, {
                    model: Message, as: 'lastMessage',
                    attributes: ['_id', 'content', 'senderId', 'createdAt']
                },
                ],
                through: {
                    attributes: []
                }
            }]
        });

        return res.status(200).json(users);

    } catch (err) {
        console.log(err);
    }


}