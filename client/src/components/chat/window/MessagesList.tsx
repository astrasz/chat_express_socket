import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { MessageType } from '../../../store/slices/currentConversationSlice';
import { RootState } from '../../../store/store';

import Message from './Message';

const MessagesList = () => {
    const [currentConversation, setCurrentConversation] = useState(null);
    const [messages, setMessages] = useState<Array<MessageType | null>>([]);
    const [partnersUsername, setPartnersUsername] = useState<string | null>(null);

    const conversation = useSelector((state: RootState) => state.currentConversation.conversationId)
    const messagesArr = useSelector((state: RootState) => state.currentConversation.messages
    )
    const username = useSelector((state: RootState) => state.currentConversation.partner?.username)

    useEffect(() => {
        setPartnersUsername(username ?? null);
    }, [partnersUsername])




    console.log('partner', partnersUsername);

    return (
        <>
            {partnersUsername && (
                <h4>`Chat with ${partnersUsername}`</h4>
            )}
            <ul className="pt-3 pe-3 chat-window__messages" data-mdb-perfect-scrollbar="true">

                {currentConversation && messages.length && messages.map(message => (
                    <Message
                        avatar='https://mdbcdn.b-cdn.net/img/new/avatars/2.webp'
                        text={message?.text ?? ''}
                        date={message?.date ?? ''}
                        senderId={message?.senderId ?? ''}

                    />
                ))}
                {/* <Message
                avatar='https://mdbcdn.b-cdn.net/img/new/avatars/2.webp'
                text='Hello there!'
                date='12:00 PM | Aug 13'
                bgColor=''
                color=''
                currentUser={false}
            />
            <Message
                avatar='https://mdbcdn.b-cdn.net/img/new/avatars/6.webp'
                text='Lorem ipsum...'
                date='12:10 PM | Aug 13'
                bgColor='bg-primary'
                color='text-white'
                currentUser={true}
            /> */}
            </ul>
        </>
    )
}

export default MessagesList;