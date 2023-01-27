import React from 'react'

interface MessageType {
    avatar: string,
    text: string,
    date: string
    bgColor: string
    color: string
    currentUser: boolean
}


const Message = ({ avatar, text, date, bgColor, color, currentUser }: MessageType) => {
    return (
        <li className={"d-flex flex-row " + (currentUser ? "justify-content-end" : "justify-content-start")
        }>
            {!currentUser && (
                <img src={avatar}
                    alt="avatar 1" className='avatar' />
            )}
            <div>
                <p className={"small p-2 ms-3 mb-1 rounded-3 " + bgColor + " " + color}>
                    {text}</p>
                <p className="small ms-3 mb-3 rounded-3 text-muted float-end">{date}</p>
            </div>
        </li >
    )
}

export default Message;



// 12:00 PM | Aug 13