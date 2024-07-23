import { useForm } from "react-hook-form";
import SideNavbar from "../../../components/SideNavBar";
import axios from "axios";
import axiosClient from "../../../../axios-client";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";

export default function CreateSpecies() {

    const { register, handleSubmit, getValues, setValue } = useForm()
    const [family, setFamily] = useState()
    const [fetch, setFetch] = useState(false)
    const [toggleType, setToggleType] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        if (!fetch)
            fetchFamily()
        onChange('unknown')
    }, [family])

    const fetchFamily = async () => {
        const { data } = await axiosClient.get('/researcher/family')
        setFamily(data.data)
        setFetch(true)
    }

    const onChange = (value) => {
        setToggleType(value)
    }


    const onSubmit = async () => {
        const values = getValues()
        const form = new FormData()
        form.append('condition', toggleType)
        form.append('condition', toggleType)
        Object.entries(values).forEach(([key, value]) => {
            form.append(key, value)
        })
        axiosClient.post(`/researcher/species`, form)
            .then(() => {
                navigate('/researcher/fishinfo')
            })
    }

    return (<>
        <SideNavbar />
        <div className=" pl-[22%] pr-[1%] w-full flex flex-col pt-[16px] pb-3">
            <div className=" flex justify-between px-14 gap-4 ">
                <h1 className=" text-title font-cabin font-bold">
                    Register Fish Species
                </h1>
            </div>
            <div className="w-[80%] px-14 mt-4">
                <div className="border shadow-md p-4 rounded-lg flex-col h-full">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="flex justify-center items-center bg-blue-400 rounded-full h-[40px] w-[40px]">1</div>
                        <h1 className=" text-subtitle font-dmsans">Select Fish Family</h1>
                    </div>
                    <div className="pl-12 mb-2">
                        <select
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            {...register("fish_info_id")}
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
                        </select>
                    </div>
                </div>
            </div>
            <div className="w-[80%] px-14 mt-4">
                <div className="border shadow-md p-4 rounded-lg flex-col h-full">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="flex justify-center items-center bg-blue-400 rounded-full h-[40px] w-[40px]">2</div>
                        <h1 className=" text-subtitle font-dmsans">Specify fish species name</h1>
                    </div>
                    <div className="pl-12 mb-2">
                        <input
                            type="text"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[40%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Family Name"
                            {...register('speciesName')}
                        />
                    </div>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="flex justify-center items-center bg-blue-400 rounded-full h-[40px] w-[40px]">2</div>
                        <h1 className=" text-subtitle font-dmsans">Justify fish conditon</h1>
                    </div>
                    <div className="pl-12 mb-2">
                        <div className="flex justify-evenly">
                            <div class="flex items-center">
                                <input onChange={(ev) => { onChange(ev.target.value) }} checked={toggleType === "unknown"} id="unknown" type="radio" value="unknown" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Unknown</label>
                            </div>
                            <div class="flex items-center">
                                <input onChange={(ev) => { onChange(ev.target.value) }} checked={toggleType === "threatened"} id="threatened" type="radio" value="threatened" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Threatened</label>
                            </div>
                            <div class="flex items-center">
                                <input onChange={(ev) => { onChange(ev.target.value) }} checked={toggleType === "endangered"} id="endangered" type="radio" value="endangered" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Endangered</label>
                            </div>
                            <div class="flex items-center">
                                <input onChange={(ev) => { onChange(ev.target.value) }} checked={toggleType === "commercial"} id="commercial" type="radio" value="commercial" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Commercial</label>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex justify-center items-center bg-blue-400 rounded-full h-[40px] w-[40px]">3</div>
                        <h1 className=" text-subtitle font-dmsans">Describe the color</h1>
                    </div>
                    <div className="pl-12 mb-2">
                        <textarea {...register('color')} id="message" rows="4" class="block p-2.5 w-[80%] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write remarks for this family type..."></textarea>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex justify-center items-center bg-blue-400 rounded-full h-[40px] w-[40px]">4</div>
                        <h1 className=" text-subtitle font-dmsans">Describe the size</h1>
                    </div>
                    <div className="pl-12 mb-2">
                        <textarea {...register('size')} id="message" rows="4" class="block p-2.5 w-[80%] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write remarks for this family type..."></textarea>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex justify-center items-center bg-blue-400 rounded-full h-[40px] w-[40px]">5</div>
                        <h1 className=" text-subtitle font-dmsans">Describe the distribution of the species</h1>
                    </div>
                    <div className="pl-12 mb-2">
                        <textarea {...register('distribution')} id="message" rows="4" class="block p-2.5 w-[80%] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write remarks for this family type..."></textarea>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex justify-center items-center bg-blue-400 rounded-full h-[40px] w-[40px]">6</div>
                        <h1 className=" text-subtitle font-dmsans">Remarks</h1>
                    </div>
                    <div className="pl-12 mb-2">
                        <textarea {...register('remarks')} id="message" rows="4" class="block p-2.5 w-[80%] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write remarks for this family type..."></textarea>
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