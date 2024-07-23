import { useForm } from "react-hook-form";
import SideNavbar from "../../../components/SideNavBar";
import axios from "axios";
import axiosClient from "../../../../axios-client";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

export default function EditFamily() {

    const { register, handleSubmit, getValues, setValue } = useForm()
    const [family, setFamily] = useState()
    const [fetch, setFetch] = useState(false)
    const [target, setTarget] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        if (!fetch)
            fetchFamily()
    }, [family])

    const fetchFamily = async () => {
        const { data } = await axiosClient.get('/researcher/family')
        setFamily(data.data)
        setFetch(true)
    }

    const onDelete = async()=>{
        axiosClient.delete(`/researcher/family/${target}`)
        .then(({data})=>{navigate('/researcher/fishinfo')})
    }

    const onChange = (ev) => {
        const selectedId = ev.target.value;
        const selected = family.find(item => item.id === parseInt(selectedId));
        setTarget(selected.id)
        if (selected) {
            setValue('familyName', selected.familyName);
            setValue('background', selected.background);
        }
    };

    const onSubmit = async () => {
        const values = getValues()
        const form = new FormData()
        Object.entries(values).forEach(([key, value]) => {
            form.append(key, value)
        })
        axiosClient.post(`/researcher/family/${values.id}`, form)
            .then(() => {
                navigate('/researcher/fishinfo')
            })
    }

    return (<>
        <SideNavbar />
        <div className=" pl-[22%] pr-[1%] w-full flex flex-col pt-[16px] pb-3">
            <div className=" flex justify-between px-14 gap-4 ">
                <h1 className=" text-title font-cabin font-bold">
                    Edit Fish Family
                </h1>
            </div>
            <div className="w-[80%] px-14 mt-4">
                <div className="border shadow-md p-4 rounded-lg flex-col h-full">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="flex justify-center items-center bg-blue-400 rounded-full h-[40px] w-[40px]">1</div>
                        <h1 className=" text-subtitle font-dmsans">Select Family Name</h1>
                    </div>
                    <div className="pl-12 mb-2">
                        <select
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            {...register("id")}
                            onChange={(ev) => onChange(ev)}
                        >
                            <option key={'none'} value={'none'}>
                                Select a family
                            </option>
                            {family &&
                                family.map(item =>
                                    <option key={item.id} value={item.id}>
                                        {item.familyName}
                                    </option>
                                )
                            }
                            {/* {speciesOptions.map(species => (
                                <option key={species.id} value={species.id}>
                                    {species.name}
                                </option>
                            ))} */}
                        </select>
                    </div>
                </div>
            </div>
            <div className="w-[80%] px-14 mt-4">
                <div className="border shadow-md p-4 rounded-lg flex-col h-full">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="flex justify-center items-center bg-blue-400 rounded-full h-[40px] w-[40px]">2</div>
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
                        <div className="flex justify-center items-center bg-blue-400 rounded-full h-[40px] w-[40px]">3</div>
                        <h1 className=" text-subtitle font-dmsans">Remarks</h1>
                    </div>
                    <div className="pl-12 mb-2">
                        <textarea {...register('background')} id="message" rows="10" class="block p-2.5 w-[80%] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write remarks for this family type..."></textarea>
                    </div>

                    <div className="flex justify-end items-end">
                        <button
                            type="button"
                            class="text-red-700 bg-white  w-fit border-[2px] border-red-700 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none"
                            onClick={onDelete}
                        >
                            Delete
                        </button>
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
                            Update
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}