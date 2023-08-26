import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Login from './Login'
import Weather from './Weather'
import Signup from './Signup'
import PrivateRoute from './PrivateRoute'
import Admin from './Admin'
import AdminPriveteRoute from './AdminPriveteRoute'
import Example from './Example'

const Mainroute = () => {
  return (
    <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/weather' element={<PrivateRoute><Weather/></PrivateRoute>}/>
        <Route path='/register' element={<Signup/>}/>
        <Route path="/admin" element={<AdminPriveteRoute><Admin/></AdminPriveteRoute>}/>
        <Route path="/example" element={<Example/>}/>

    </Routes>
  )
}

export default Mainroute