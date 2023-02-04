import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { addMessageToConversation } from '../../../api';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { useSocketContext } from '../../../hooks/useSocketContext';
import { useAppDispatch } from '../../../store/hooks';
import { addMessage } from '../../../store/slices/currentConversationSlice';
import { updateLastMessage } from '../../../store/slices/usersSlice';
import { RootState } from '../../../store/store';

const InputBox = () => {
    const { socket } = useSocketContext()
    const [content, setContent] = useState('')
    const dispatch = useAppDispatch();
    const { user } = useAuthContext();
    const currentConversationId = useSelector((state: RootState) => state.currentConversation.conversationId)

    const handleSubmit = (e: any) => {
        e.preventDefault();
        addMessageToConversation(user?.token ?? '', currentConversationId ?? '', JSON.stringify({ content }));

        const date = new Date().toString();
        socket.emit('message', { avatar: user?.avatar, conversationId: currentConversationId, senderId: user?.id, content, time: date });

        dispatch(addMessage({ avatar: user?.avatar ?? '', text: content, date, senderId: user?.id ?? '' }));
        dispatch(updateLastMessage({ conversationId: currentConversationId, lastMessage: content, lastMessageDate: date }));
        setContent('');
    }

    const handleChange = (e: any) => {
        const content = e.target.value;
        setContent(content)
    }

    return (
        <div className="text-muted d-flex justify-content-start align-items-center ps-4 pe-4 pb-4 mt-2 chat-window__input">
            <img src={user?.avatar}
                alt="avatar 3" className='avatar' />
            <form onSubmit={handleSubmit}>
                <input type="text" className="form-control form-control-md"
                    placeholder="Type message" value={content} onChange={handleChange} />
            </form>
        </div>
    )
}

export default InputBox;