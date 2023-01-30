import React from 'react';
import { useEffect, useState, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useAppDispatch } from '../../store/hooks';
import { fetchUsers } from '../../store/slices/usersSlice';

import io from 'socket.io-client';


import LeaveButton from './LeaveButton';
import Search from './sidebar/Search';
import UsersList from './sidebar/UsersList';
import MessagesList from './window/MessagesList';
import InputBox from './window/InputBox';
import { useAuthContext } from '../../hooks/useAuthContext';
import { setConnection } from './socketClient';

type ChatProps = {

}

const ChatLayout = ({ }: ChatProps) => {
    const [error, setError] = useState(false);
    const dispatch = useAppDispatch();
    const { user } = useAuthContext();
    const toastId = Math.random()


    const notify = (message: string) => {
        if (!toast.isActive(toastId)) {
            toast(message, {
                toastId
            })
        }
    }

    useEffect(() => {
        if (user?.token) {
            dispatch(fetchUsers(user.token))
                .unwrap()
                .catch((err: any) => {
                    setError(true);
                    notify(`${err.message}: cannot fetch users list.`)
                });
            setConnection(user.token);
        }

    }, [user?.token])

    return (
        <section>
            <ToastContainer
                position="bottom-left"
                autoClose={6000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <div className="container d-flex justify-content-center align-items-center">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card d-flex" id="chat">
                            <div className="card-body d-flex flex-column h-100">
                                <div className="row justify-content-end mb-3 me-1 card-body__leave">
                                    <div className='col-md-4 col-lg-2 d-grid justify-content-end'>
                                        <LeaveButton />
                                    </div>
                                </div>
                                <div className="row card-body__chat flex-xs-row">
                                    <div className="col-6 col-md-5 col-lg-4 col-xl-3 mb-4">
                                        <div className="p-3 chat-navigation">
                                            <Search />
                                            {!error && <UsersList />}
                                        </div>
                                    </div>

                                    <div className="col-6 col-md-7 col-lg-8 col-xl-9 chat-window">
                                        <MessagesList />
                                        <InputBox />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    )
}

export default ChatLayout;