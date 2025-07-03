import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../store/authSlice'
import authService from '../../appwrite/auth'

function LogoutBtn() {
    const dispatch=useDispatch()
    const logoutHandler=()=>{
        authService.logout().then(()=>{
            dispatch(logout())
        })
    }
  return (
    <div>
      <button onClick={logoutHandler}>Logout</button>
    </div>
  )
}

export default LogoutBtn
