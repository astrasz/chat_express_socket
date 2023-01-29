import React from 'react'

import { useAuth } from '../../hooks/useAuth'

const LeaveButton = () => {

    const { logOut } = useAuth();


    return (
        <button className='btn btn-danger' onClick={() => logOut()}>Leave</button>
    )
}

export default LeaveButton;