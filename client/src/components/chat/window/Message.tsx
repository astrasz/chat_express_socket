import React from 'react';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { MessageType } from '../../../store/slices/currentConversationSlice';
import { isSameDay, formatDistanceToNow, differenceInMinutes, format } from 'date-fns';

const Message = ({ avatar, text, date, senderId }: MessageType) => {

    const { user } = useAuthContext()

    const currentUser = senderId === user?.id
    const bgColor = 'bg-primary';
    const color = 'text-white';


    const formatTime = (time: Date) => {
        if (differenceInMinutes(new Date(), time) < 60) {
            return formatDistanceToNow(new Date(date), { addSuffix: true })
        } else if (isSameDay(time, new Date())) {
            return format(time, 'HH:mm');
        } else {
            return time.toLocaleString();
        }
    }

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
                <p className="small ms-3 mb-3 rounded-3 text-muted float-end time">{formatTime(new Date(date))}</p>
            </div>
        </li >
    )
}

export default Message;