import { differenceInMinutes, formatDistanceToNow, isSameDay, format } from 'date-fns';
import React, { useState } from 'react'
import { createConversation, findConversationByParticipants, getMessagesByConversationId, updateParticipation } from '../../../api';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { useSocketContext } from '../../../hooks/useSocketContext';
import { useAppDispatch } from '../../../store/hooks';
import { setCurrentConversation, setMessages, setPartner } from '../../../store/slices/currentConversationSlice';
import { clearUnread, updatePartner } from '../../../store/slices/usersSlice';
import { UserType } from './UsersList';

const User = ({ _id, username, lastMessage, lastMessageDate, unread, avatar }: UserType) => {
    const { socket } = useSocketContext();
    const [error, setError] = useState('');
    const { user } = useAuthContext();
    const dispatch = useAppDispatch();

    const handleClick = async () => {
        try {
            const findResponse = await findConversationByParticipants(user?.token ?? '', _id ?? '');
            let conversation = await findResponse.json();
            const lastChecked = new Date();

            if (Array.isArray(conversation) && conversation.length === 0) {
                const createResponse = await createConversation(
                    user?.token ?? '',
                    JSON.stringify({ partnerId: _id, lastChecked }));
                conversation = await createResponse.json();
            }
            let fetchedConversation = conversation;

            if (Array.isArray(conversation)) {
                fetchedConversation = conversation[0]
            }
            const conversationId = fetchedConversation._id;
            const participationId = fetchedConversation.Participation._id;
            if (fetchedConversation.Participation.lastChecked !== lastChecked) {
                await updateParticipation(user?.token ?? '', participationId, JSON.stringify({ lastChecked }));
            }
            const messagesResponse = await getMessagesByConversationId(user?.token ?? '', conversationId);
            const messages = await messagesResponse.json();

            socket.emit('joinRoom', { conversationId, partnerId: _id });

            dispatch(setCurrentConversation(conversationId));
            dispatch(setPartner({
                id: _id ?? '',
                username,
                avatar,
            }))
            dispatch(updatePartner({ partnerId: _id, conversationId }));
            dispatch(setMessages(messages));
            dispatch(clearUnread(conversationId));
        } catch (err: any) {
            setError(err.message);
            console.log('Error: ' + err);
        }
    }

    const formatTime = (time: Date) => {
        if (isSameDay(time, new Date())) {
            return format(time, 'HH:mm');
        } else {
            return format(time, 'd.mm.Y HH:mm');
        }
    }

    return (
        <li className="p-1 mb-3 list-group-item border-bottom-1" onClick={handleClick}>
            <a href="#!" className="d-flex justify-content-between text-decoration-none">
                <div className="d-flex flex-row">
                    <div>
                        <img
                            src={avatar}
                            alt="avatar" className="d-flex align-self-center me-3" width="50" />
                    </div>
                    <div className="pt-0">
                        <p className="fw-bold mb-1">{username}</p>
                        {!!lastMessage && (<p className="small text-muted">{!!(lastMessage.length > 20) ? lastMessage.substring(0, 20).trim() + '...' : lastMessage.substring(0, 20)}</p>)}
                    </div>
                </div>
                <div className="pt-0 text-end">
                    {!!lastMessageDate && (<p className="small text-muted mb-1">{formatTime(new Date(lastMessageDate))}</p>)}
                    {!!unread && (<p className='mb-1'><span className="badge bg-danger rounded-pill">{unread}</span></p>)}
                </div>
            </a>
        </li>
    )
}

export default User;