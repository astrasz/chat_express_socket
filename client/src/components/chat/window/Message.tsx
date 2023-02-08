import React from 'react';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { MessageType } from '../../../store/slices/currentConversationSlice';
import { isSameDay, formatDistanceToNow, differenceInMinutes, format, isSameYear } from 'date-fns';



const Message = ({ avatar, text, date, senderId }: MessageType) => {

    const { user } = useAuthContext()

    const currentUser = senderId === user?.id
    const bgColor = 'bg-primary';
    const color = 'text-white';


    const formatTime = (time: Date) => {
        const now = new Date();
        let newFormat;
        switch (true) {
            case differenceInMinutes(now, time) < 60:
                newFormat = formatDistanceToNow(new Date(time), { addSuffix: true });
                break;
            case isSameDay(time, now):
                newFormat = format(time, 'HH:mm');
                break;
            case isSameYear(time, now):
                newFormat = format(time, 'd.mm HH:mm');
                break;
            default:
                newFormat = format(time, 'd.mm.YY HH:mm');
        }
        return newFormat;
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