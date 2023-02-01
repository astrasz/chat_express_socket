import React from 'react'
import { RootState } from '../../../store/store'

import User from './User'
import { useAppSelector } from '../../../store/hooks'



export interface UserType {
    _id?: string | null,
    username: string,
    lastMessage: string,
    lastMessageDate: string,
    avatar: string
}

const UsersList = () => {
    const users = useAppSelector((state: RootState) => state.users);

    return (
        <div data-mdb-perfect-scrollbar="true" className="chat-navigation__users">
            <ul className="list-group list-group-flush ">
                {users.length && users.map((user: UserType) => (
                    <User
                        key={user._id}
                        _id={user._id}
                        username={user.username}
                        lastMessage={'Please....'}
                        lastMessageDate={'Just now'}
                        avatar={'https://mdbcdn.b-cdn.net/img/new/avatars/6.webp'}
                    />
                ))}
            </ul>
        </div>
    )
}

export default UsersList;