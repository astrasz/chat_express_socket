import React from 'react';

import Message from './Message';

const MessagesList = () => {
    return (
        <ul className="pt-3 pe-3 chat-window__messages" data-mdb-perfect-scrollbar="true">
            <Message
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
            />
        </ul>
    )
}

export default MessagesList;