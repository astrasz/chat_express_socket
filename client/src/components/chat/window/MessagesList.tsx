import { send } from 'process';
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { addMessage, MessageType } from '../../../store/slices/currentConversationSlice';
import { RootState } from '../../../store/store';

import Message from './Message';

const MessagesList = ({ socket }: any) => {

    const messagesEndRef = useRef<null | HTMLDivElement>(null);
    const dispatch = useDispatch();
    const currentConversation = useSelector((state: RootState) => state.currentConversation.conversationId);
    const messages = useSelector((state: RootState) => state.currentConversation.messages
    );
    const partnersUsername = useSelector((state: RootState) => state.currentConversation.partner.username);

    useEffect(() => {
        if (socket) {
            socket.on('getMessage', (data: any) => {
                const { avatar, time, senderId, content } = data;
                dispatch(addMessage({ avatar, date: time, senderId, text: content }));
            })
        }
    }, [socket]);

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

                {currentConversation && !!messages.length && messages.map((message, index) => (
                    <Message
                        key={index}
                        avatar='https://mdbcdn.b-cdn.net/img/new/avatars/2.webp'
                        text={message?.text ?? ''}
                        date={message?.date ?? ''}
                        senderId={message?.senderId ?? ''}

                    />
                ))}
                <div ref={messagesEndRef} />
            </ul>
        </div>
    )
}

export default MessagesList;