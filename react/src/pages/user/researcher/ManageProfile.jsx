import { Link } from "react-router-dom"
import SideNavbar from "../../../components/SideNavBar";
import { useEffect, useState } from "react";
import axiosClient from "../../../../axios-client";
import Loading from "../../../components/Loading";
import PopupForm from "../../../components/PopupForm";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useStateContext } from "../../../contexts/ContextProvider";
export default function ManageProfile() {
    const [display, setDisplay] = useState(false);
    const [dataset, setDataset] = useState([]);
    const [query, setQuery] = useState(true);
    const [loading, setLoading] = useState(false);
    const [toggle, setToggle] = useState(false);

    const { register, handleSubmit, getValues, setValue, reset } = useForm({});

    const { user, setUser } = useStateContext()

    useEffect(() => {
        if (user)
            reg()
    }, [user]);

    const reg = () => {
        setValue('name', user.profile.name)
        setValue('orcid', user.profile.orcid)
        setValue('organization', user.profile.organization)
        setValue('field', user.profile.field)
        setValue('phoneno', user.profile.phoneno)
    }


    const onSubmit = async () => {
        setLoading(true);
        const values = getValues()
        const form = new FormData()
        Object.entries(values).forEach(([key, value]) => {
            form.append(key, value);
        });
        const { data } = await axiosClient.post(`/researcher/user/update/${user.id}`, form)
        setLoading(false)
        window.location.reload()
    };

    const changePass = async (data) => {

        const { oldpassword, newpassword, repassword } = data
        const form = new FormData()
        form.append('oldpassword', oldpassword)
        form.append('newpassword', newpassword)
        if (newpassword === repassword) {
            const response = await axiosClient.post('/changepassword', form)
            if (response.status === 200) {
                reset({oldpassword:'',newpassword:'',repassword:''})
                setDisplay(false)
            }
        }else{
            toast.warn('Confirm password doesnt match')
        }
    }


    return (
        <>
            <SideNavbar />
            <div className="h-[50px] pl-[21%] pr-[1%] w-full flex flex-col pt-[16px]">

                <div className="flex gap-4 justify-start mt-4">
                    {loading && <Loading />}
                    <div className="border bg-slate-300 shadow-md p-6 rounded-lg flex-col basis-[50%] self-start">
                        <h1 className="text-3xl font-cabin font-bold">
                            Account Information
                        </h1>
                        <div className="flex mb-4">
                            <div className="mt-4 basis-[60%]">
                                <h2 className="font-roboto-bold-italic text-slate-700">Username</h2>
                                <p className="text-sm">{user && user.email}</p>
                            </div>
                            <div className="mt-4">
                                <h2 className="font-roboto-bold-italic text-slate-700">Roles</h2>
                                {user && user.roles.map(item =>
                                    <p className="text-sm">{item.name}</p>
                                )}
                            </div>
                        </div>

                        <button
                            type="button"
                            class="text-black bg-slate-200 hover:bg-slate-500 w-fit focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none"
                            onClick={() => setDisplay(true)}
                        >
                            Change Password
                        </button>
                    </div>
                    <div className="border bg-slate-300 shadow-md p-6 rounded-lg flex-col self-start grow">
                        <h1 className="text-3xl font-cabin font-bold">
                            General Information
                        </h1>
                        {toggle &&
                            <div class="mt-4 p-2 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                <div class="relative">
                                    <input {...register('name')} type="text" class="peer bg-slate-300 w-[80%] placeholder-transparent h-10 focus:outline-none focus:ring-0 focus:shadow-none border-0 border-b-2 border-slate-700 text-gray-900 " placeholder="Full Name" />
                                    <label for="name" class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Full Name</label>
                                </div>
                                <div class="relative">
                                    <input {...register('orcid')} type="text" class="peer bg-slate-300 placeholder-transparent h-10 w-[40%] focus:outline-none focus:ring-0 focus:shadow-none border-0 border-b-2 border-slate-700 text-gray-900 " placeholder="Orcid" />
                                    <label for="orcid" class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Orcid</label>
                                </div>
                                <div class="relative">
                                    <input {...register('organization')} type="text" class="peer bg-slate-300 placeholder-transparent h-10 w-[80%] focus:outline-none focus:ring-0 focus:shadow-none border-0 border-b-2 border-slate-700 text-gray-900 " placeholder="Organization" />
                                    <label for="organization" class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Organization</label>
                                </div>
                                <div class="relative">
                                    <input {...register('field')} type="text" class="peer bg-slate-300 placeholder-transparent h-10 w-[60%] focus:outline-none focus:ring-0 focus:shadow-none border-0 border-b-2 border-slate-700 text-gray-900 " placeholder="Field" />
                                    <label for="field" class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Field</label>
                                </div>
                                <div class="relative mb-4">
                                    <input {...register('phoneno')} type="text" class="peer bg-slate-300 placeholder-transparent h-10 w-[50%] focus:outline-none focus:ring-0 focus:shadow-none border-0 border-b-2 border-slate-700 text-gray-900 " placeholder="Phone Number" />
                                    <label for="phoneno" class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Phone Number</label>
                                </div>
                                <div className="flex justify-end gap-2">
                                    <button
                                        type="button"
                                        class="bg-transparent  text-blue-700  py-2.5 px-4 border border-blue-700  font-medium rounded-lg text-sm"
                                        onClick={() => setToggle(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={onSubmit}
                                        class="text-white bg-blue-700 font-medium rounded-lg text-sm px-4 py-2.5"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        }
                        {!toggle &&
                            <>
                                <div className="flex mb-1">
                                    <div className="mt-4 basis-[70%]">
                                        <h2 className="font-roboto-bold-italic text-slate-700">Full Name</h2>
                                        <p className="text-sm">{user && user.profile.name}</p>
                                    </div>
                                    <div className="mt-4">
                                        <h2 className="font-roboto-bold-italic text-slate-700">Orcid</h2>
                                        <p className="text-sm">{user && user.profile.orcid}</p>
                                    </div>
                                </div>
                                <div className="flex mb-4">
                                    <div className="mt-4 basis-[70%]">
                                        <h2 className="font-roboto-bold-italic text-slate-700">Organization</h2>
                                        <p className="text-sm">{user && user.profile.organization}</p>
                                    </div>
                                    <div className="mt-4">
                                        <h2 className="font-roboto-bold-italic text-slate-700">Field</h2>
                                        <p className="text-sm">{user && user.profile.field}</p>
                                    </div>
                                </div>
                                <div className="mt-4 basis-[70%] mb-4">
                                    <h2 className="font-roboto-bold-italic text-slate-700">Phone Number</h2>
                                    <p className="text-sm">{user && user.profile.phoneno}</p>
                                </div>
                                <button
                                    type="button"
                                    class="text-black bg-slate-200 hover:bg-slate-500 w-fit focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none"
                                    onClick={() => setToggle(true)}
                                >
                                    Edit
                                </button>
                            </>
                        }
                    </div>
                </div>
            </div>
            <form onSubmit={handleSubmit(changePass)}>
                <PopupForm display={display} setDisplay={setDisplay}>
                    <h3 class="mb-3 text-2xl font-bold text-white">
                        Change Password
                    </h3>
                    <div>
                        <label class="block mb-2 text-sm font-medium text-white">
                            Old Password
                        </label>
                        <input
                            type="password"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            {...register("oldpassword")}
                            required
                        />
                    </div>
                    <div>
                        <label class="block mb-2 text-sm font-medium text-white">
                            New Passsword
                        </label>
                        <input
                            type="password"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            {...register("newpassword")}
                            required
                        />
                    </div>
                    <div>
                        <label class="block mb-2 text-sm font-medium text-white">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            {...register("repassword")}
                            required
                        />
                    </div>
                </PopupForm>
            </form>
        </>
    );
}
