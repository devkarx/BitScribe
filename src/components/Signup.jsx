import React, { useState, useEffect } from 'react'
import { Link, matchPath, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import { Button, Input, Logo } from "./index"
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'
import { useForm } from 'react-hook-form'

function SignUp() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error, setError] = useState('');
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const signup = async (data) => {
        setError("");
        try {
            const createdUser = await authService.createAccount(data);
            if (createdUser) {
                const currentUser = await authService.getCurrentUser();
                if (currentUser) {
                    dispatch(authLogin(currentUser));
                    navigate("/");
                }
            }
        } catch (err) {
            setError(err.message || "Something went wrong");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <div className="mx-auto w-full max-w-lg bg-gray-800 rounded-xl p-10 border border-gray-700">
                <div className="mb-4 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight text-white">Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-gray-400">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-blue-400 transition-all duration-200 hover:underline hover:text-blue-300"
                    >
                        Sign In
                    </Link>
                </p>

                {error && <p className="text-red-400 mt-4 text-center">{error}</p>}

                <form onSubmit={handleSubmit(signup)} className="mt-8">
                    <Input
                        label="Name:"
                        placeholder="Enter your full Name"
                        {...register("name", { required: true })}
                    />
                    {errors.name && <p className="text-red-400 text-sm mb-2">Name is required</p>}

                    <Input
                        label="Email:"
                        placeholder="Enter your email address"
                        type="email"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[\w._%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/,
                                message: "Invalid email address"
                            }
                        })}
                    />
                    {errors.email && <p className="text-red-400 text-sm mb-2">{errors.email.message}</p>}

                    <Input
                        label="Password:"
                        type="password"
                        placeholder="Password"
                        {...register("password", {
                            required: "Password is required",
                            pattern: {
                                value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                                message: "Password must be at least 8 characters, include uppercase, lowercase, and a number"
                            }
                        })}
                    />
                    {errors.password && <p className="text-red-400 text-sm mb-2">{errors.password.message}</p>}

                    <Button type="submit" className="w-full mt-4 bg-blue-600 hover:bg-blue-700">
                        Create Account
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default SignUp;