import React, {useState} from 'react'
import { Link, matchPath, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import {Button, Input, Logo} from "./index"
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'
import { useForm } from 'react-hook-form'


function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register, handleSubmit }= useForm()
    const [error, setError] = useState("")

    const login =async(data)=>{
        setError("")
        try {
            const session= await authService.login(data)
            if (session) {
                const userData= await authService.getCurrentUser()
                if (userData) {
                    dispatch(authLogin(userData));
                    navigate("/")
                }
            } else {
                
            }
        } catch (error) {
            setError(error.message)
        }
    }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="mx-auto w-full max-w-lg bg-gray-800 rounded-xl p-10 border border-gray-700">
        <div className="mb-4 flex justify-center">
            <span className="inline-block w-full max-w-[100px]"> 
                <Logo width="100%" /> 
            </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight text-white">Sign in to your Account</h2>
        <p className="mt-2 text-center text-base text-gray-400">
            Don&apos;t have an account?&nbsp; 
            <Link to="/signup" className="font-medium text-blue-400 hover:underline hover:text-blue-300 transition-all">
                Sign Up
            </Link> 
        </p>
        {error && <p className="text-red-400 mt-4 text-center">{error}</p>}
        <form onSubmit={handleSubmit(login)} className='mt-8'>
            <div className='space-y-5'>
                <Input 
                label="Email:"
                placeholder="Enter your email address"
                type="email"
                {...register("email", {
                    required: true,
                    validate: {
                        mathPatern:(value)=> /([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}/igm.test(value) || 
                        "Email address must be valid"
                    }
                })}
                />

                <Input 
                label="Password:"
                type="password"
                placeholder="Password"
                {...register("password",{
                    required: true,
            
                })}
                />
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">Sign in</Button>
            </div>
        </form>
      </div>
    </div>
  )
}

export default Login