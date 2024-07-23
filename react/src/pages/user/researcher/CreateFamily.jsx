import { useForm } from "react-hook-form";
import SideNavbar from "../../../components/SideNavBar";
import axiosClient from "../../../../axios-client";
import { useNavigate } from "react-router-dom";

export default function CreateFamily() {

    const navigate = useNavigate()
    const { register, handleSubmit, getValues } = useForm();

    const onSubmit = async () => {
        const values = getValues()
        const form = new FormData()
        Object.entries(values).forEach(([key, value]) => {
            form.append(key, value)
        })
        axiosClient.post('/researcher/family', form)
            .then(() => {
                navigate('/researcher/fishinfo')
            })
    }

    return (<>
        <SideNavbar />
        <div className=" pl-[22%] pr-[1%] w-full flex flex-col pt-[16px] pb-3">
            <div className=" flex justify-between px-14 gap-4 ">
                <h1 className=" text-title font-cabin font-bold">
                    Register Fish Family
                </h1>
            </div>
            <div className="w-[80%] px-14 mt-4">
                <div className="border shadow-md p-4 rounded-lg flex-col h-full">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="flex justify-center items-center bg-blue-400 rounded-full h-[40px] w-[40px]">1</div>
                        <h1 className=" text-subtitle font-dmsans">Specify Family Name</h1>
                    </div>
                    <div className="pl-12 mb-2">
                        <input
                            type="text"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[40%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Family Name"
                            {...register('familyName')}
                        />
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="flex justify-center items-center bg-blue-400 rounded-full h-[40px] w-[40px]">2</div>
                        <h1 className=" text-subtitle font-dmsans">Remarks</h1>
                    </div>
                    <div className="pl-12 mb-2">
                        <textarea {...register('background')} id="message" rows="10" class="block p-2.5 w-[80%] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write remarks for this family type..."></textarea>
                    </div>

                    <div className="flex justify-end items-end">
                        <button
                            type="button"
                            class="text-blue-700 bg-white  w-fit border-[2px] border-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none"
                            onClick={() => navigate('/researcher/fishinfo')}
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            class="text-white bg-blue-700 hover:bg-blue-800 w-fit focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none"
                            onClick={onSubmit}
                        >
                            Register
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}