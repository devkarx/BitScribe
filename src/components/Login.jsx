
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
    <div>
      <div>
        <div>
            <span> <Logo width="100%" /> </span>
        </div>
        <h2>Sign in to your Account </h2>
        <p>Don&apos;t have an account?&nbsp; <Link to="/signup" >Sign Up</Link> </p>
        {error && <p>{error}</p>}
        <form onSubmit={handleSubmit(login)} className='mt-8'>
            <div>
                <Input 
                label="Email:"
                placeholder="Enter your email address"
                type="email"
                {...register("email", {
                    required: true,
                    pattern: {
                        value: /([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}/igm,
                        message: "Email address must be valid"
                    }
                })}
                />

                <Input 
                label="Password:"
                type="password"
                placeholder="Password"
                {...register("password",{
                    required: true,
                    pattern: {
                        value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                        message: "Chose a stronger Password"
                    }
                })}
                />
                <Button type="submit" className="w-full" >Sign in</Button>
            </div>
        </form>
      </div>
    </div>
  )
}

export default Login
