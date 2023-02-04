import React, { useEffect, useState } from 'react'
import { RootState } from '../../../store/store'

import User from './User'
import { useAppSelector } from '../../../store/hooks'
import { UsersState } from '../../../store/slices/usersSlice'

export interface UserType {
    _id?: string | null,
    username: string,
    lastMessage: string,
    lastMessageDate: string,
    unread: number,
    conversationId: string
    avatar: string
}

const UsersList = (props: { searching: string }) => {
    const [users, setUsers] = useState<UsersState | []>([])
    const usersState = useAppSelector((state: RootState) => state.users);


    useEffect(() => {
        let users = usersState;
        if (props.searching !== '') {
            users = usersState.filter((user: UserType) => user.username.search(props.searching) !== -1)
        }
        setUsers(users)
    }, [usersState, props.searching])

    return (
        <div data-mdb-perfect-scrollbar="true" className="chat-navigation__users">
            <ul className="list-group list-group-flush ">
                {!!users.length && users.map((user: UserType) => (
                    <User
                        key={user._id}
                        _id={user._id}
                        username={user.username}
                        lastMessage={user.lastMessage}
                        lastMessageDate={user.lastMessageDate}
                        unread={user.unread}
                        avatar={user.avatar}
                        conversationId={user.conversationId}
                    />
                )
                )}
            </ul>
        </div>
    )
}

export default UsersList;