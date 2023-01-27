import io from 'socket.io-client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import ChatLayout from './components/chat/ChatLayout';
import Signup from './components/Signup';
import Login from './components/Login';
import { useAuthContext } from './hooks/useAuthContext';



const socket = io();

function App() {
  const context = useAuthContext();
  console.log(context);
  return (
    <BrowserRouter>
      <Routes>
        (<Route
          path='/'
          element={context.user ? <ChatLayout /> : <Navigate to='/login' />}
        />)
        <Route
          path='/login'
          element={!context.user ? <Login /> : <Navigate to='/' />}
        />
        <Route
          path='/signup'
          element={!context.user ? <Signup /> : <Navigate to='/' />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
