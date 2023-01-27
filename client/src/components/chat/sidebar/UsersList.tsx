import React from 'react'

import User from './User'

const users = [
    { id: 1, username: 'Alice', lastMessage: 'Hello!', lastMessageDate: 'Just now', avatar: 'https://mdbcdn.b-cdn.net/img/new/avatars/6.webp' },
    { id: 2, username: 'Mike', lastMessage: 'Bye!', lastMessageDate: 'Yesterday', avatar: 'https://mdbcdn.b-cdn.net/img/new/avatars/2.webp' },
    { id: 3, username: 'Jack', lastMessage: 'Please...', lastMessageDate: '1 hour ago', avatar: 'https://mdbcdn.b-cdn.net/img/new/avatars/3.webp' },
    { id: 4, username: 'Alice', lastMessage: 'Hello!', lastMessageDate: 'Just now', avatar: 'https://mdbcdn.b-cdn.net/img/new/avatars/6.webp' },
    { id: 5, username: 'Mike', lastMessage: 'Bye!', lastMessageDate: 'Yesterday', avatar: 'https://mdbcdn.b-cdn.net/img/new/avatars/2.webp' },
    { id: 6, username: 'Jack', lastMessage: 'Please...', lastMessageDate: '1 hour ago', avatar: 'https://mdbcdn.b-cdn.net/img/new/avatars/3.webp' },
    { id: 7, username: 'Alice', lastMessage: 'Hello!', lastMessageDate: 'Just now', avatar: 'https://mdbcdn.b-cdn.net/img/new/avatars/6.webp' },
    { id: 8, username: 'Mike', lastMessage: 'Bye!', lastMessageDate: 'Yesterday', avatar: 'https://mdbcdn.b-cdn.net/img/new/avatars/2.webp' },
    { id: 9, username: 'Jack', lastMessage: 'Please...', lastMessageDate: '1 hou ago', avatar: 'https://mdbcdn.b-cdn.net/img/new/avatars/3.webp' },
]

const UsersList = () => {
    return (
        <div data-mdb-perfect-scrollbar="true" className="chat-navigation__users">
            <ul className="list-group list-group-flush ">
                {users.length && users.map(user => (
                    <User
                        key={user.id}
                        username={user.username}
                        lastMessage={user.lastMessage}
                        lastMessageDate={user.lastMessageDate}
                        avatar={user.avatar}
                    />
                ))}
            </ul>
        </div>
    )
}

export default UsersList