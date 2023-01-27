import React from 'react'

interface UserType {
    username: string,
    lastMessage: string,
    lastMessageDate: string,
    avatar: string
}

const User = ({ username, lastMessage, lastMessageDate, avatar }: UserType) => {
    return (
        <li className="p-1 mb-3 list-group-item border-bottom-1">
            <a href="#!" className="d-flex justify-content-between text-decoration-none">
                <div className="d-flex flex-row">
                    <div>
                        <img
                            src={avatar}
                            alt="avatar" className="d-flex align-self-center me-3" width="50" />
                    </div>
                    <div className="pt-1">
                        <p className="fw-bold mb-0">{username}</p>
                        <p className="small text-muted">{lastMessage}</p>
                    </div>
                </div>
                <div className="pt-1 text-end">
                    <h6 className='mb-1'><span className="badge bg-danger rounded-pill">3</span></h6>
                    <p className="small text-muted mb-1">{lastMessageDate}</p>
                </div>
            </a>
        </li>
    )
}

export default User;