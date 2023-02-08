import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { addMessage, addMessages } from '../../../store/slices/currentConversationSlice';
import { RootState } from '../../../store/store';
import { useSocketContext } from '../../../hooks/useSocketContext';

import Message from './Message';
import { increaseUnread, updateLastMessage } from '../../../store/slices/usersSlice';
import { getMessagesByConversationId } from '../../../api';

type Props = {
    setIsTypingRef: (data: { conversationId: string; content: string | null }) => void,
    isTypingRef: any
}

const MessagesList: React.FC<Props> = ({ setIsTypingRef, isTypingRef }) => {
    const [scrollTopNumber, setScrollTopNumber] = useState<number>(1)
    const { socket } = useSocketContext();
    const { user } = useAuthContext();
    const messagesListRef = useRef<null | HTMLUListElement>(null);
    const messagesEndRef = useRef<null | HTMLDivElement>(null);
    const dispatch = useDispatch();

    const currentConversation = useSelector((state: RootState) => state.currentConversation.conversationId);
    const messages = useSelector((state: RootState) => state.currentConversation.messages
    );
    const partnersUsername = useSelector((state: RootState) => state.currentConversation.partner.username);
    const partnerAvatar = useSelector((state: RootState) => state.currentConversation.partner.avatar)

    const setRef = (data: any) => setIsTypingRef(data);

    useEffect(() => {
        socket.on('getMessage', (data: any) => {
            setRef({ conversationId: '', content: '' })
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

    useEffect(() => {
        socket.on('getTyping', (data: any) => {
            if (messagesListRef.current) {
                const isNotScrolled = messagesListRef.current.scrollHeight - messagesListRef.current.scrollTop < messagesListRef.current.clientHeight + 50;
                if (isNotScrolled === true) {
                    scrollToBottom();
                }
            }
            setRef(data);
        },);

        return () => {
            socket.off('getTyping');
        }
    }, [isTypingRef])


    useEffect(() => {
        if (scrollTopNumber === 1) {
            scrollToBottom()
        }
        if (messages.length === 10) {
            setScrollTopNumber(1);
        }
    }, [messages]);

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth", block: 'start' });
        }
    }

    const handleScroll = async (e: any) => {
        const top = e.target.scrollTop === 0;
        if (top) {
            setScrollTopNumber(prevState => ++prevState);
            const messagesRes = await getMessagesByConversationId(user?.token ?? '', currentConversation ?? '', { offset: scrollTopNumber * 10 });
            const messages = await messagesRes.json();
            dispatch(addMessages(messages));
        }
    }

    return (
        <div className='chat-window__messages'>
            {partnersUsername && (
                <h5>Chat with {partnersUsername}</h5>
            )}
            <ul className="pt-3 pe-3 chat-window__messages" id='messages' data-mdb-perfect-scrollbar="true" onScroll={handleScroll} ref={messagesListRef}>
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
                {isTypingRef.current && (
                    <div id='typing-animation'>
                        <span className='dot first'></span>
                        <span className='dot second'></span>
                        <span className='dot third'></span>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </ul >
        </div >
    )
}

export default MessagesList;