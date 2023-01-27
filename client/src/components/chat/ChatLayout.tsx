import React from 'react';

import LeaveButton from './LeaveButton';
import Search from './sidebar/Search';
import UsersList from './sidebar/UsersList';
import MessagesList from './window/MessagesList';
import InputBox from './window/InputBox';

type ChatProps = {

}


const ChatLayout = ({ }: ChatProps) => {
    return (
        <section>
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
                                            <UsersList />
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