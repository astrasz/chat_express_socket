import io from 'socket.io-client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';


import { useAuthContext } from './hooks/useAuthContext';


import ChatLayout from './components/chat/ChatLayout';
import Signup from './components/Signup';
import Login from './components/Login';



const socket = io();

function App() {
  const context = useAuthContext();

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
