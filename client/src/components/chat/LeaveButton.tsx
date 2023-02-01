import React from 'react'
import { logout } from '../../api';

import { useAuth } from '../../hooks/useAuth'
import { useAuthContext } from '../../hooks/useAuthContext';

const LeaveButton = () => {

    const { logOut } = useAuth();
    const { user } = useAuthContext();

    const handleClick = async () => {
        await logout(user?.token ?? '');
        logOut();
    }

    return (
        <button className='btn btn-danger' onClick={handleClick}>Leave</button>
    )
}

export default LeaveButton;