import { useEffect, useRef, useState } from "react";
import axiosClient from "../../../../axios-client";
import SideNavbar from "../../../components/SideNavBar";
import { Link, useParams } from "react-router-dom";
import SampleTable from "../../../components/SampleTable";
import Loading from "../../../components/Loading";
import Popup from "../../../components/Popup";
import PopupForm from "../../../components/PopupForm";
import fileDownload from "js-file-download";
import { useForm } from "react-hook-form";
import location from "../../../assets/icons/location.svg";
import { toast } from "react-toastify";
import { data } from "autoprefixer";



export default function SampleReview() {
    const [dataset, setDataset] = useState();
    const [species, setSpecies] = useState();
    const [available, setAvailable] = useState(true);
    const [toggle, setToggle] = useState([]);
    const [loading, setLoading] = useState(false);
    const [query, setQuery] = useState("")
    const [toggleType, setToggleType] = useState(null);
    const [upload, setUpload] = useState(false);
    const { register, handleSubmit, getValues, reset } = useForm();

    useEffect(() => {
        if (!dataset)
            getResource()
        if (!species)
            getSpecies()
        if (dataset) {
            setToggle(Array(Object.keys(dataset).length).fill(false))
            setToggleType(Array(Object.keys(dataset).length))
            dataset.map((item, index) => {
                onChange(item.type, index)
            })
        }

    }, [dataset]);

    const filteredItems = dataset ? dataset.filter(item => {
        // return item.state.toLowerCase().includes(query.toLowerCase())
        return true
    }) : null

    const onChange = (type, index) => {
        setToggleType((prevState) => {
            const newState = [...prevState];
            newState[index] = type;
            return newState;
        })
    }
    const toggleDetailVisibility = (index) => {
        setToggle((prevState) => {
            const newState = [...prevState];
            newState[index] = !newState[index];
            return newState;
        });
    };

    const getResource = () => {
        setLoading(true);
        axiosClient.get("/sample/review").then(({ data }) => {
            console.log(data.data)
            setDataset(data.data);
            data.data.length < 1 ? setAvailable(true) : setAvailable(false)
            setLoading(false)
        });
    };
    const getSpecies = async () => {
        setLoading(true);
        const { data } = await axiosClient.get("/researcher/species");
        setSpecies(data.data);
        setLoading(false);
    };
    const onSubmit = (id, status, taskid) => {
        const formData = new FormData()
        const values = getValues()
        const type = Object.keys(values).filter(key => key.startsWith('type'));
        if (species.some(item=>item.speciesName === values.species_id) && values[type]!== null && values.commonname.length > 1) {
            // setLoading(true)
            Object.entries(values).forEach(([key, value]) => {
                if (key.includes('type'))
                    key = 'type'
                formData.append(key, value)
            })
            formData.append('id', id)
            formData.append('taskid', taskid)
            formData.append('status', status)

            axiosClient.post("/sample/result", formData)
                .then(({ data }) => {
                    toast.info(data.message)
                    setLoading(false)
                    setTimeout(() => {
                        window.location.reload()
                    }, 700)
                }).catch(() => {
                    console.log("problem")
                })
        }

    };

    return (
        <>
            <SideNavbar />
            <div className="h-[50px] pl-[21%] pr-[1%] w-full flex flex-col pt-[16px]">
                <div className="flex items-center gap-4">
                    <div className="flex flex-col">
                        <h1 className="text-[30px] font-cabin font-bold">
                            Sample Review
                        </h1>
                    </div>
                </div>
                {/* <div className="ml-0 mt-10 flex justify-start px-14 gap-4">
                    <div class="relative">
                        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input
                            value={query}
                            type="search"
                            class="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-500 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Search by state"
                            onChange={e => setQuery(e.target.value)}
                        />
                    </div>
                </div> */}
                <div className="w-full px-14 mt-6">
                    {loading && <Loading />}
                    <div className="border w-full mb-4" />
                    {available &&
                        (<h1 className="mt-10 text-xl text-gray-400 w-full text-center">The dataset for review is not available</h1>)
                    }
                    {filteredItems && filteredItems.map((item, index) =>
                    (<>
                        <div className="border w-full justify-between flex items-center p-4 rounded-lg shadow-lg mb-4">
                            <div className=" basis-[40%]">
                                <div className="font-bold text-lg  text-gray-900 ">{item.info.speciesName}</div>
                                <div className="text-sm font-medium text-gray-900"><span className="font-bold text-sm  text-gray-900">in</span> {item.info.fishinfo.familyName}</div>
                            </div>
                            <div className="flex gap-2">
                                {toggle[index] && <>
                                    <button
                                        type="submit"
                                        onClick={() => {
                                            onSubmit(item.id, 'accepted', item.task[0].id)
                                        }}
                                        class="text-green-700 bg-white border-[2px] border-green-700 text-sm rounded-lg px-4 py-2.5 flex items-center justify-center"
                                    >
                                        <i class="fa-solid fa-check"></i>
                                        &nbsp; Accept
                                    </button>
                                    <button
                                        type="submit"
                                        onClick={() => {
                                            onSubmit(item.id, 'rejected', item.task[0].id)
                                        }}
                                        class="text-red-500 bg-white border-[2px] border-red-500 text-sm rounded-lg px-4 py-2.5 flex items-center justify-center"
                                    >
                                        <i class="fa-solid fa-x"></i>
                                        &nbsp; Reject
                                    </button>
                                </>
                                }
                                <button
                                    type="button"
                                    onClick={() => {
                                        toggleDetailVisibility(index)
                                        console.log(toggleType)
                                    }}
                                    class="text-white bg-blue-700 font-medium rounded-lg text-sm px-4 py-2.5 flex items-center justify-center"
                                >
                                    <i class="fa-regular fa-eye"></i>
                                    &nbsp; View
                                </button>
                            </div>
                        </div>
                        {toggle[index] &&

                            <div className="border bg-slate-300 w-full justify-center flex p-4 rounded-lg shadow-lg mb-4">
                                <div className="grid grid-cols-3 gap-4 py-4">
                                    <div className=" rounded-lg p-4 ">
                                        <h1 className="font-cabin text-2xl my-2 font-semibold">
                                            Identification
                                        </h1>
                                        <div className="mb-2">
                                            <label class="mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                Reference No.
                                            </label>
                                            <input
                                                type="text"
                                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                defaultValue={item.refno}
                                                readOnly
                                            />
                                        </div>
                                        <div className="mb-2">
                                            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                Sampling Id
                                            </label>
                                            <input
                                                type="text"
                                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                defaultValue={item.samplingid}
                                                readOnly
                                            />
                                        </div>
                                        {item.identifiedBy && <>
                                            <div className="mb-2">
                                                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                    Identified By
                                                </label>
                                                <input
                                                    type="text"
                                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    {...register("identifiedBy")}
                                                    defaultValue={item.identifiedBy}
                                                    readOnly
                                                />
                                            </div>
                                            <div className="mb-2">
                                                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                    Identified Date
                                                </label>
                                                <input
                                                    type="date"
                                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    {...register("identifiedDate")}
                                                    defaultValue={item.identifiedDate}
                                                    readOnly
                                                />
                                            </div>
                                        </>}

                                    </div>
                                    <div className="  rounded-lg p-4 ">
                                        <h1 className="font-cabin text-2xl my-2 font-semibold">
                                            Taxonomy
                                        </h1>
                                        <label className="w-full flex justify-center items-center border border-hidden rounded-md overflow-hidden my-4 cursor-pointer">
                                            {item.photo && (
                                                <img
                                                    src={item.photo}
                                                    alt="fish"
                                                    className="h-full w-full object-cover"
                                                />
                                            )}
                                            {!item.photo && (
                                                <span className="border-[4px] border-blue-300 rounded-lg p-5 border-dotted font-dmsans font-bold">
                                                    <i class="fa-regular fa-image"></i>
                                                    &nbsp; No Image Uploaded
                                                </span>
                                            )}
                                        </label>
                                        <div>
                                            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                Common Name <span className=" text-xs">(Editable)</span>
                                            </label>
                                            <input
                                                type="text"
                                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                {...register("commonname")}
                                                defaultValue={item.commonname}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                Species <span className=" text-xs">(Editable)</span>
                                            </label>
                                            <input
                                                type="text"
                                                list="species"
                                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                {...register("species_id")}
                                                defaultValue={item.info.speciesName}
                                                required
                                            />
                                            <datalist id="species">
                                                {species.map((item) => (
                                                    <option value={item.speciesName} />
                                                ))}
                                            </datalist>
                                        </div>
                                        <div className="my-2">
                                            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                Type <span className=" text-xs">(Editable)</span>
                                            </label>
                                            <div className="flex-col mb-2">
                                                <div class="flex items-center">
                                                    <input {...register(`type_${index}`)} onChange={(ev) => { onChange(ev.target.value, index) }} checked={toggleType[index] === "estuarine"} type="radio" value="estuarine" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" required />
                                                    <label class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Estuarine</label>
                                                </div>
                                                <div class="flex items-center">
                                                    <input {...register(`type_${index}`)} onChange={(ev) => { onChange(ev.target.value, index) }} checked={toggleType[index] === "freshwater"} type="radio" value="freshwater" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" required />
                                                    <label class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Freshwater</label>
                                                </div>
                                                <div class="flex items-center">
                                                    <input {...register(`type_${index}`)} onChange={(ev) => { onChange(ev.target.value, index) }} checked={toggleType[index] === "marine"} type="radio" value="marine" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" required />
                                                    <label class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Marine</label>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    <div className=" rounded-lg p-4 ">
                                        <h1 className="font-cabin text-2xl my-2 font-semibold">
                                            Capture Information
                                        </h1>
                                        <div>
                                            <div>
                                                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                    Collector Name
                                                </label>
                                                <input
                                                    type="text"
                                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    defaultValue={item.collectorname}
                                                    readOnly
                                                />
                                            </div>
                                            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                Collected Date and Time
                                            </label>
                                            <input
                                                type="datetime-local"
                                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                defaultValue={item.datecollected}
                                                readOnly
                                            />
                                        </div>
                                        <div>
                                            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                Collect Method
                                            </label>
                                            <input
                                                type="text"
                                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                defaultValue={item.collectmethod}
                                                readOnly

                                            />
                                        </div>
                                        <div>
                                            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                Longitude
                                            </label>
                                            <input
                                                type="text"
                                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                defaultValue={item.longitude}
                                                readOnly
                                            />
                                        </div>
                                        <div>
                                            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                Latitude
                                            </label>
                                            <input
                                                type="text"
                                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                defaultValue={item.latitude}
                                                readOnly
                                            />
                                        </div>
                                        <div>
                                            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                Depth
                                            </label>
                                            <input
                                                type="text"
                                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                defaultValue={item.depth}
                                                readOnly
                                            />
                                        </div>
                                        <div>
                                            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                Weight
                                            </label>
                                            <input
                                                type="text"
                                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                defaultValue={item.weight}
                                                readOnly
                                            />
                                        </div>
                                        <div>
                                            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                Standard Length(mm)
                                            </label>
                                            <input
                                                type="text"
                                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                defaultValue={item.standardL}
                                                readOnly
                                            />
                                        </div>
                                        <div>
                                            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                Fork Length(mm)
                                            </label>
                                            <input
                                                type="text"
                                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                defaultValue={item.forkL}
                                                readOnly
                                            />
                                        </div>
                                        <div>
                                            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                Total Length(mm)
                                            </label>
                                            <input
                                                type="text"
                                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                defaultValue={item.totalL}
                                                readOnly
                                            />
                                        </div>
                                    </div>

                                </div>
                            </div>

                        }
                    </>
                    )
                    )}
                </div>
            </div>
        </>
    );
}
