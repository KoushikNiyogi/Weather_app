import React from 'react'
import { Navigate } from 'react-router-dom'

const AdminPriveteRoute = ({children}) => {
  const user = JSON.parse(localStorage.getItem("user"))

  if(!user || user.email!="admin@gmail.com"){
   return <Navigate to={"/"}/>
  }
  return children
}

export default AdminPriveteRoute