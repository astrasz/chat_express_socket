import React from 'react'
import { useAuthContext } from '../../../hooks/useAuthContext'
import { MessageType } from '../../../store/slices/currentConversationSlice'




const Message = ({ avatar, text, date, senderId }: MessageType) => {

    const { user } = useAuthContext()

    const currentUser = senderId === user?.id
    const bgColor = 'bg-primary';
    const color = 'text-white';

    return (
        <li className={"d-flex flex-row " + (currentUser ? "justify-content-end" : "justify-content-start")
        }>
            {!currentUser && (
                <img src={avatar}
                    alt="avatar 1" className='avatar' />
            )}
            <div>
                <p className={"small p-2 ms-3 mb-1 rounded-3 " + (currentUser && (bgColor + " " + color))}>
                    {text}</p>
                <p className="small ms-3 mb-3 rounded-3 text-muted float-end">{date}</p>
            </div>
        </li >
    )
}

export default Message;



// 12:00 PM | Aug 13