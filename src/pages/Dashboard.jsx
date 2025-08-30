import React from 'react'
import useAuthContext from '../hooks/useAuthContext';
import { useNavigate } from 'react-router';

export default function Dashboard() {
    const {user,logoutUser}=useAuthContext()
    const navigate=useNavigate()

    const logOut=()=>{
        logoutUser()
        navigate("/")
    }
  return (
    <div className='min-h-screen p-5 flex flex-col items-center justify-center'>
        <h1>Dashboard</h1>
        <p className=''>First Name : {user?.first_name}</p>
        <p className=''>Last Name : {user?.last_name}</p>
        <p className=''>Email : {user?.email}</p>
        <p className=''>Address : {user?.address}</p>
        <p className=''>Phone : {user?.phone_number}</p>

        
        <button className='btn btn-warning' onClick={logOut}>Logout</button>
    </div>
  )
}
