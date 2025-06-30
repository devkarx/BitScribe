import React, { useState } from 'react'
import { Link, matchPath, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../authSlice'
import { Button, Input, Logo } from "./index"
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { useForm } from 'react-hook-form'


function SignUp() {
    const navigate = useNavigate()
    const [error, setError] = useState()
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()

    const signup = async (data) => {
        setError("")
        try {
            const userData = await authService.createAccount(data)
            if (userData) {
                const userData = await authService.getCurrentUser()
                if (userData) {
                    dispatch(login(userData));
                    navigate("/")
                }
            }
        } catch (error) {
            setError(error.message)
        }
    }
    return (
        <div className="flex items-center justify-center">
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                <form onClick={handleSubmit(create)}>
                    <div>
                        <Input
                            label="Name:"
                            placeholder="Enter your full Name"
                            {...register, ("name", {
                                required: true,
                            })}
                        />

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
                            {...register("password", {
                                required: true,
                                pattern: {
                                    value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                                    message: "Chose a stronger Password"
                                }
                            })}
                        />
                        <Button type="submit" className="w-full"> Create Account </Button>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default SignUp
