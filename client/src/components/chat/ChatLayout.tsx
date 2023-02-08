import React from 'react';
import { useEffect, useState, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useAppDispatch } from '../../store/hooks';
import { fetchUsers } from '../../store/slices/usersSlice';

import LeaveButton from './LeaveButton';
import Search from './sidebar/Search';
import UsersList from './sidebar/UsersList';
import MessagesList from './window/MessagesList';
import InputBox from './window/InputBox';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useAuth } from '../../hooks/useAuth';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

type ChatProps = {

}

const ChatLayout: React.FC = ({ }: ChatProps) => {
    const [isTyping, setIsTyping] = useState<boolean>(false)
    const isTypingRef = useRef<boolean>(false)
    const currentConversation = useSelector((state: RootState) => state.currentConversation.conversationId)
    const [error, setError] = useState(false);
    const [searchText, setSearchText] = useState<string>('')
    const dispatch = useAppDispatch();
    const { user } = useAuthContext();
    const { logOut } = useAuth()
    const toastId = Math.random()

    const notify = (message: string) => {
        if (!toast.isActive(toastId)) {
            toast(message, {
                toastId
            })
        }
    }

    useEffect(() => {
        if (user && user.token !== 'Bearer ') {
            dispatch(fetchUsers(user.token))
                .unwrap()
                .catch((err: any) => {
                    setError(true);
                    if (err.auth === false) {
                        return logOut();
                    }
                    notify(`${err.message}: cannot fetch users list.`)
                });
        }

    }, [user?.token])

    const handleSearch = (searchText: string) => {
        setSearchText(searchText);
    }

    const setIsTypingRef = (data: { conversationId: string, content: string | null }) => {
        if (isTyping === false) {
            setIsTyping(true);
            isTypingRef.current = true;
        }
        if (data.content?.length === 0) {
            setIsTyping(false);
            isTypingRef.current = false
        }
    }

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
                                    <div className="col-5 mb-4">
                                        <div className="p-3 chat-navigation">
                                            <Search
                                                handleSearch={handleSearch}
                                            />
                                            {!error && <UsersList
                                                searching={searchText}
                                            />}
                                        </div>
                                    </div>

                                    <div className="col-7 chat-window">
                                        <MessagesList
                                            setIsTypingRef={setIsTypingRef}
                                            isTypingRef={isTypingRef} />
                                        {!!currentConversation && (
                                            <InputBox
                                                setIsTypingRef={setIsTypingRef}
                                            />
                                        )}
                                        {!currentConversation && (
                                            <div className='start-question'>
                                                {/* <h3>pick someone to start...</h3> */}
                                            </div>
                                        )}
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