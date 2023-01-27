import React from 'react'

const InputBox = () => {
    return (
        <div className="text-muted d-flex justify-content-start align-items-center ps-4 pe-4 pb-4 mt-2 chat-window__input">
            <img src='https://mdbcdn.b-cdn.net/img/new/avatars/6.webp'
                alt="avatar 3" className='avatar' />
            <input type="text" className="form-control form-control-md"
                placeholder="Type message" />
        </div>
    )
}

export default InputBox;