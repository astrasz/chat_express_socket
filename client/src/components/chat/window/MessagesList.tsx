import { send } from 'process';
import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { addMessage } from '../../../store/slices/currentConversationSlice';
import { RootState } from '../../../store/store';
import { useSocketContext } from '../../../hooks/useSocketContext';

import Message from './Message';
import { increaseUnread, updateLastMessage } from '../../../store/slices/usersSlice';

const MessagesList = () => {

    const { socket } = useSocketContext();
    const { user } = useAuthContext();
    const messagesEndRef = useRef<null | HTMLDivElement>(null);
    const dispatch = useDispatch();

    const currentConversation = useSelector((state: RootState) => state.currentConversation.conversationId);
    const messages = useSelector((state: RootState) => state.currentConversation.messages
    );
    const partnersUsername = useSelector((state: RootState) => state.currentConversation.partner.username);
    const partnerAvatar = useSelector((state: RootState) => state.currentConversation.partner.avatar)

    useEffect(() => {
        socket.on('getMessage', (data: any) => {
            const { avatar, time, senderId, content, conversationId } = data;
            dispatch(addMessage({ avatar, date: time, senderId, text: content }));
            dispatch(updateLastMessage({ senderId, lastMessage: content, lastMessageDate: time, participant: 'partner' }))
            if (currentConversation === null || currentConversation !== conversationId) {
                dispatch(increaseUnread(senderId))
            }

        })

        return () => {
            socket.off('getMessage')
        }
    }, [currentConversation]);

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
        }
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages]);

    return (
        <div className='chat-window__messages'>
            {partnersUsername && (
                <h5>Chat with {partnersUsername}</h5>
            )}
            <ul className="pt-3 pe-3 chat-window__messages" data-mdb-perfect-scrollbar="true">
                {currentConversation && !!messages.length && messages.map((message, index) => {
                    const avatar = message?.senderId === user?.id ? user?.avatar : partnerAvatar;

                    return (<Message
                        key={index}
                        avatar={avatar ?? ''}
                        text={message?.text ?? ''}
                        date={message?.date ?? ''}
                        senderId={message?.senderId ?? ''}

                    />)
                })}
                <div ref={messagesEndRef} />
            </ul>
        </div>
    )
}

export default MessagesList;