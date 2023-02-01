import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { addMessageToConversation } from '../../../api';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { useAppDispatch } from '../../../store/hooks';
import { addMessage } from '../../../store/slices/currentConversationSlice';
import { RootState } from '../../../store/store';
import { sendMessage } from '../socketClient';

const InputBox = () => {
    const [content, setContent] = useState('')
    const dispatch = useAppDispatch();
    const { user } = useAuthContext();
    const currentConversationId = useSelector((state: RootState) => state.currentConversation.conversationId)
    const avatar = 'https://mdbcdn.b-cdn.net/img/new/avatars/6.webp'

    const handleSubmit = (e: any) => {
        e.preventDefault();
        addMessageToConversation(user?.token ?? '', currentConversationId ?? '', JSON.stringify({ content }));
        const date = new Date().toLocaleString();
        sendMessage(avatar, currentConversationId ?? '', user?.id ?? '', content, date);
        dispatch(addMessage({ avatar, text: content, date, senderId: user?.id ?? '' }));
        setContent('');
    }

    const handleChange = (e: any) => {
        const content = e.target.value;
        setContent(content)
    }

    return (
        <div className="text-muted d-flex justify-content-start align-items-center ps-4 pe-4 pb-4 mt-2 chat-window__input">
            <img src='https://mdbcdn.b-cdn.net/img/new/avatars/6.webp'
                alt="avatar 3" className='avatar' />
            <form onSubmit={handleSubmit}>
                <input type="text" className="form-control form-control-md"
                    placeholder="Type message" value={content} onChange={handleChange} />
            </form>
        </div>
    )
}

export default InputBox;