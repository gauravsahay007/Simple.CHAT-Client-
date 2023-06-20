import React from 'react'
import { Route,Routes,BrowserRouter } from 'react-router-dom'
import ChatProvider from './main/chatProvider'

// -------------------------------------------
import Signup from './Components/Auth/Signup'
import Login from './Components/Auth/Login'
import Mychats from './Components/Mychats'

import Test from './test'
import ChatPage from './Pages/ChatPage'
// --------------------------------------------
export default function Router() {
  
  return (
   
       <BrowserRouter>
        <ChatProvider>
    <Routes>
        <Route path='/signup' exact element={<Signup/>} />
        <Route path='/login' exact element={<Login/>} />
        <Route path='/chats' exact element={<ChatPage/>} />
        <Route path='/test' exact element={<Test/>}/>
    </Routes>
    </ChatProvider>
    </BrowserRouter>
  
   
  )
}
