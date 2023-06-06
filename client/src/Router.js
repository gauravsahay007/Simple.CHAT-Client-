import React from 'react'
import { Route,Routes, BrowserRouter, useParams } from 'react-router-dom'
import Signup from './Components/Auth/Signup'
import Login from './Components/Auth/Login'
export default function Router() {
  return (
    <BrowserRouter>
    <Routes>
        <Route path='/signup' exact element={<Signup/>} />
        <Route path='/login' exact element={<Login/>} />
    </Routes>
    </BrowserRouter>
  )
}
