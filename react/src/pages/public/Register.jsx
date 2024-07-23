import { useEffect, useState } from "react"
import RegisterForm from "../../components/RegisterForm"
import { useForm } from "react-hook-form"
import axiosClient from "../../../axios-client"
import { toast } from "react-toastify"
import Loading from "../../components/Loading"
import { Link, useNavigate } from "react-router-dom"

export default function Register() {
    const [nextPage, setNextPage] = useState(false)
    const [isResearcher, setIsResearcher] = useState(false)
    const [loading, setLoading] = useState(false);
    const [activate, setActivate] = useState(false)
    const { register, getValues, handleSubmit, reset, watch } = useForm()
    const navigate = useNavigate()

    useEffect(() => {
        console.log(isResearcher)

    }, [isResearcher])

    const onSub = () => {
        const password = watch('password')
        const confirm = watch('confirm')
        const email = watch('email')
        if (password == "" || confirm == "" || email == "") {
            toast.info("Please complete the fields")
        }
        else {
            let con = true
            if (password !== confirm) {
                toast.error('Password doesnt match')
                con = false
            } if (!/[^\w\s]/.test(password)) {
                toast.error('Password must contain at least one special character')
                con = false
            } if (password.length < 8) {
                toast.error('Password must at least 8 character long')
                con = false
            }
            if (con) {
                setNextPage(true)
                toast.dismiss()
            }
        }
    }
    const onSubmit = () => {
        const form = new FormData();
        const values = getValues();
        setLoading(true)
        if (isResearcher)
            form.append('role', 'Researcher')
        else
            form.append('role', 'Contributor')
        Object.entries(values).forEach(([key, value]) => {
            form.append(key, value);
        });
        axiosClient.post('/register', form).then(({ data }) => {
            setLoading(false)
            toast.info(data.message)
            setTimeout(() => {
                navigate('/login')
            }, 1500);
        })
    }

    const form = (researcher) => {
        setActivate(true)
        if (researcher) {
            setIsResearcher(true)
        }
        else {
            setIsResearcher(false)
        }
    }

    return (
        <>
            {!activate &&
                <RegisterForm>
                    {loading && <Loading />}
                    <div className="flex flex-col items-center justify-center gap-4">
                        <h1 class="font-bold leading-tight tracking-tight text-gray-900 text-2xl dark:text-white">
                            Select Role
                        </h1>
                        <div className="flex gap-4 mt-6">
                            <div onClick={() => form(true)} className="hover:cursor-pointer flex flex-col gap-2 justify-center items-center bg-slate-200 rounded-lg shadow p-4">
                                <i class="fa-solid fa-magnifying-glass fa-2x"></i>
                                <p className="text-[14px] font-dmsans hover:text-cyan-500 duration-100">
                                    Researcher
                                </p>
                            </div>
                            <div onClick={() => form(false)} className="hover:cursor-pointer flex flex-col gap-2 justify-center items-center bg-slate-200 rounded-lg shadow p-4">
                                <i class="fa-solid fa-hand-holding-hand fa-2x"></i>
                                <p className="text-[14px] font-dmsans hover:text-cyan-500 duration-100">
                                    Contributor
                                </p>
                            </div>
                        </div>
                        <Link to={'/'} className="underline text-blue-700 w-full flex justify-center">Back to homepage</Link>

                    </div>
                </RegisterForm>
            }
            {activate && <>
                {!nextPage &&
                    <RegisterForm>
                        <div className="flex items-center gap-4">
                            <div className="text-white text-2xl font-bold w-[40px] h-[40px] rounded-full flex justify-center items-center bg-blue-600">
                                1
                            </div>
                            <h1 class="font-bold leading-tight tracking-tight text-gray-900 text-2xl dark:text-white">
                                Account Credential
                            </h1>
                        </div>
                        <form class="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSub)}>
                            <div>
                                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <input {...register('email')} type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" />
                            </div>
                            <div>
                                <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input {...register('password')} type="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                            <div>
                                <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input {...register('confirm')} type="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>

                            <button type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Next Step</button>
                        </form>
                    </RegisterForm>
                }
                {nextPage &&
                    <RegisterForm>
                        <div className="flex items-center gap-4">
                            <div className="text-white text-2xl font-bold w-[40px] h-[40px] rounded-full flex justify-center items-center bg-blue-600">
                                2
                            </div>
                            <h1 class="font-bold leading-tight tracking-tight text-gray-900 text-2xl dark:text-white">
                                User Profile
                            </h1>
                        </div>
                        <form class="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
                            <div>
                                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Full Name</label>
                                <input {...register('name')} type="text" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Fill in your name" required />
                            </div>
                            {isResearcher && <>
                                <div>
                                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ORCID iD (Optional)</label>
                                    <input {...register('orcid')} type="text" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Fill in your ORCID iD" />
                                </div>
                                <div>
                                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Organization</label>
                                    <input {...register('organization')} type="text" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Fill in your organization name" required />
                                </div>
                                <div>
                                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Field</label>
                                    <input {...register('field')} type="text" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Fill in your field" />
                                </div>
                                
                            </>}
                            {!isResearcher &&
                                <div>
                                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Organization (Optional)</label>
                                    <input {...register('organization')} type="text" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Fill in your organization name" />
                                </div>
                            }
                            <div>
                                <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone No. (Optional)</label>
                                <input {...register('phoneno')} type="number" placeholder="e.g. 0134546899" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>

                            <button onClick={() => {
                                reset()
                                setNextPage(false)
                            }} type="button" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Back</button>
                            <button type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Submit</button>
                        </form>
                    </RegisterForm>
                }
            </>
            }
        </>
    )
}