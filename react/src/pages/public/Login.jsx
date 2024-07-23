import { useForm } from "react-hook-form";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import axiosClient from "../../../axios-client";
import { useStateContext } from "../../contexts/ContextProvider";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

export default function Login({ message }) {

    const { handleSubmit, register, getValues } = useForm()
    const { setToken, token, setUser } = useStateContext()
    const [fetch, setFetch] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        if (message != null) {
            if (message)
                toast.info("Your account is ready to use, please login into the system")
            else {
                toast.info("The verification link is no longer valid")
            }
        }
        if(fetch){
            axiosClient.get('/user').then(({data})=>{
                setUser(data)
                navigate('/')
            })
        }

    }, [token])

    if (token) {
        // return <Navigate to="/researcher/summary"/>
    }

    const onSubmit = () => {
        const form = new FormData();
        const values = getValues();
        Object.entries(values).forEach(([key, value]) => {
            form.append(key, value);
        });
        axiosClient.post('/login', form).then(({ data }) => {
            setToken(data.token)
            setFetch(true)
        }).catch(error => {
            if (error.response.status === 401) {
                toast.error(error.response.data.message)
            }
        })
    }

    return (
        <div class="min-h-screen bg-blue-100 py-3 flex justify-center gap-10 sm:py-12 px-32">
            <div className="basis-[60%] flex justify-center items-center">
                <div className="bg-blue-400 w-[90%] h-[30%] rounded-xl justify-center items-center flex">
                    <h1 className="p-10 font-dmsans font-bold text-4xl text-white">Fish Digital Dataset System</h1>
                </div>
            </div>
            <div class="relative py-3">
                <div
                    class="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
                </div>
                <div class="relative px-4 py-6 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div class="max-w-md mx-auto">
                            <div className="flex justify-center">
                                <h1 class="text-2xl font-semibold">User Login</h1>
                            </div>
                            <div class="divide-y divide-gray-200">
                                <div class="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                    <div class="relative">
                                        <input {...register('email')} type="text" class="peer placeholder-transparent h-10 w-full focus:outline-none focus:ring-0 focus:shadow-none border-0 border-b-2 border-gray-300 text-gray-900 " placeholder="Email address" />
                                        <label for="email" class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Email Address</label>
                                    </div>
                                    <div class="relative">
                                        <input {...register('password')} autocomplete="off" type="password" class="peer placeholder-transparent h-10 w-full focus:outline-none focus:ring-0 focus:shadow-none border-0 border-b-2 border-gray-300 text-gray-900 " placeholder="Password" />
                                        <label for="password" class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Password</label>
                                    </div>
                                    <div class="relative">
                                        <button class=" bg-blue-700 font-bold text-white rounded-md px-2 py-2 text-button w-full mt-1">Submit</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                    <div class="w-full flex justify-center">
                        New user?&nbsp; <Link to={'/register'} className="underline text-blue-700">Register now!</Link>
                    </div>
                    <Link to={'/'} className="underline text-blue-700 w-full flex justify-center">Back to homepage</Link>
                </div>
            </div>
        </div>
    )
}