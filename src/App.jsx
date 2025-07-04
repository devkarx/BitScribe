import { useEffect, useState } from 'react'
import './App.css'
import { useDispatch } from 'react-redux'
import authService from "./appwrite/auth"
import {login,logout} from "./store/authSlice"
import { Outlet } from 'react-router-dom'
import {Header,Footer} from "./components/index"

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData)=>{
      if(userData){
        dispatch((login(userData)))
      }else{
        dispatch(logout())
      }
    })
    .finally(()=>{
      setLoading(false);
    })
  }, [])
  
  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-900'>
      <div className='w-full'>
        <Header/>
        <main className='pb-8'>
          <Outlet/>
        </main>
        <Footer/>
      </div>
    </div>
  ) : null
}

export default App
