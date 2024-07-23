import { Link } from "react-router-dom"
import SideNavbar from "../../../components/SideNavBar";
import { useEffect, useState } from "react";
import axiosClient from "../../../../axios-client";
import Loading from "../../../components/Loading";
import PopupForm from "../../../components/PopupForm";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
export default function SharedDataset() {
    const [display, setDisplay] = useState(false);
    const [dataset, setDataset] = useState([]);
    const [query, setQuery] = useState(true);
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, getValues, setValue } = useForm({});

    useEffect(() => {
        getDataset();
    }, []);


    const filteredItems = dataset ? dataset.filter(item => {
        if (query)
            return item.requester.toLowerCase().includes("myrequest")
        else
            return !item.requester.toLowerCase().includes("myrequest")

    }) : null

    const getDataset = () => {
        setLoading(true);
        axiosClient.get("/researcher/shared/dataset").then(({ data }) => {
            setLoading(false);
            setDataset(data.data);
        });
    };


    const onSubmit = (id,user_id,operation) => {
        setLoading(true);
        const form = new FormData()
        form.append('dataset_id',id)
        form.append('user_id',user_id)
        form.append('operation',operation)
        axiosClient.post("/repository/requestresult", form).then(({data}) => {
            setDisplay(false)
            toast.info(data.message)
            getDataset()
        });
    };

    const onDelete = (datasetid, userid) => {
        if (!window.confirm("Are you sure to delete the request?")) return;
        setLoading(true);
        const form = new FormData();
        form.append('dataset_id', datasetid)
        form.append('user_id', userid)
        axiosClient.post("/repository/cancelrequest", form).then(({ data }) => {
            setLoading(false);
            toast.info(data.message)
            getDataset();
        });
    };

    return (
        <>
            <SideNavbar />
            <div className="h-[50px] pl-[21%] pr-[1%] w-full flex flex-col pt-[16px]">
                <h1 className="py-[20px] text-[30px] font-cabin font-bold">
                    Dataset Sharing
                </h1>
                <div className="flex">
                    <button
                        id="button1"
                        type="button"
                        onClick={(ev) => {
                            ev.currentTarget.classList.add('ring-2', 'ring-blue-300', 'bg-white', 'text-blue-700', 'outline-none')
                            ev.currentTarget.classList.remove('text-white', 'bg-blue-700')
                            const element1 = document.getElementById('button2')
                            element1.classList.remove('ring-2', 'ring-blue-300', 'bg-white', 'text-blue-700', 'outline-none')
                            element1.classList.add('text-white', 'bg-blue-700')
                            setQuery(true)
                        }}
                        class="ring-2 ring-blue-300 bg-white text-blue-700 outline-none w-fit font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 "
                    >
                        Outgoing Request
                    </button>
                    <button
                        id="button2"
                        type="button"
                        onClick={(ev) => {
                            ev.currentTarget.classList.add('ring-2', 'ring-blue-300', 'bg-white', 'text-blue-700', 'outline-none')
                            ev.currentTarget.classList.remove('text-white', 'bg-blue-700')
                            const element = document.getElementById('button1')
                            element.classList.remove('ring-2', 'ring-blue-300', 'bg-white', 'text-blue-700', 'outline-none')
                            element.classList.add('text-white', 'bg-blue-700')
                            setQuery(false)
                        }}
                        class="text-white bg-blue-700  w-fit font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 "
                    >
                        Ingoing Request
                    </button>
                    {/* <button
                        id="button3"
                        type="button"
                        onClick={(ev) => {
                            ev.currentTarget.classList.add('ring-2', 'ring-blue-300', 'bg-white', 'text-blue-700', 'outline-none')
                            ev.currentTarget.classList.remove('text-white', 'bg-blue-700')
                            const element = document.getElementById('button1')
                            element.classList.remove('ring-2', 'ring-blue-300', 'bg-white', 'text-blue-700', 'outline-none')
                            element.classList.add('text-white', 'bg-blue-700')
                            const element1 = document.getElementById('button2')
                            element1.classList.remove('ring-2', 'ring-blue-300', 'bg-white', 'text-blue-700', 'outline-none')
                            element1.classList.add('text-white', 'bg-blue-700')
                            // setQuery(false)
                        }}
                        class="text-white bg-blue-700  w-fit font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 "
                    >
                        Manage Shared Dataset
                    </button> */}
                </div>
                <div className="flex flex-wrap gap-2 justify-start mt-4">
                    {loading && <Loading />}
                    {filteredItems.map((d) => (
                        <div className="p-4  border-gray-500 border-[2px] rounded-md flex justify-between items-center px-4">
                            <Link
                                to={query ? `/researcher/repository/${d.dataset_id}` : `/researcher/${d.dataset_id}/sharedsite`}
                                className="flex flex-col basis-[80%] justify-start"
                            >
                                <p className="font-cabin font-bold text-xl">
                                    {d.datasetTitle}
                                </p>
                                <p className="font-cabin">State: {d.state}</p>
                                <p className="font-cabin">Status: {d.status === 'requested' ? 'in-process' : 'successful'}</p>
                                {!query && (
                                    <p className="font-cabin">Requested by: {d.requester}</p>
                                )}
                            </Link>
                            {!query && <div className="flex gap-2 items-center ml-10">
                                <button
                                    type="submit"
                                    onClick={() => {
                                        onSubmit(d.dataset_id,d.user_id,'accept')
                                    }}
                                    class="text-green-700 bg-white border-[2px] border-green-700 text-sm rounded-lg p-1 flex items-center justify-center"
                                >
                                    <i class="fa-solid fa-check"></i>
                                </button>
                                <button
                                    type="submit"
                                    onClick={() => {
                                        onSubmit(d.dataset_id,d.user_id,'reject')
                                    }}
                                    class="text-red-500 bg-white border-[2px] border-red-500 text-sm rounded-lg p-1 flex items-center justify-center"
                                >
                                    <i class="fa-solid fa-x"></i>
                                </button>
                            </div>
                            }
                            {query &&
                                <div
                                    onClick={() => onDelete(d.dataset_id, d.user_id)}
                                    className="flex justify-end grow hover:scale-125 cursor-pointer transition duration-200"
                                >
                                    <div className="h-[40px]">
                                        <img
                                            className="h-full"
                                            src="https://www.svgrepo.com/show/527928/trash-bin-trash.svg"
                                        ></img>
                                    </div>
                                </div>
                            }
                        </div>
                    ))}
                    {filteredItems && filteredItems.length === 0 && (
                        <div className="w-full flex justify-center items-center h-[100px]">
                            {!query && <h1 className="font-dmsans text-xl">
                                No request for your dataset at current time
                            </h1>}
                            {query && <h1 className="font-dmsans text-xl">
                                You dont have any shared dataset yet, requests one!
                            </h1>}
                        </div>
                    )}
                </div>
            </div>
            {/* <form onSubmit={handleSubmit(onSubmit)}>
                <PopupForm display={display} setDisplay={setDisplay}>
                    <h3 class="mb-3 text-2xl font-bold text-white">
                        Dataset Form
                    </h3>
                    <div>
                        <label class="block mb-2 text-sm font-medium text-white">
                            Dataset Title
                        </label>
                        <input
                            type="text"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            {...register("datasetTitle")}
                            required
                        />
                    </div>
                    <input type="hidden" {...register("id")} />
                    <div>
                        <label class="block mb-2 text-sm font-medium text-white">
                            State
                        </label>
                        <select
                            {...register("state")}
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                            <option value="johor">johor</option>
                            <option value="kedah">kedah</option>
                            <option value="kelantan">kelantan</option>
                            <option value="melaka">melaka</option>
                            <option value="negeri sembilan">
                                negeri sembilan
                            </option>
                            <option value="pahang">pahang</option>
                            <option value="perak">perak</option>
                            <option value="perlis">perlis</option>
                            <option value="pulau pinang">pulau pinang</option>
                            <option value="sabah">sabah</option>
                            <option value="sarawak">sarawak</option>
                            <option value="selangor">selangor</option>
                            <option value="terengganu">terengganu</option>
                            <option value="kuala lumpur">kuala lumpur</option>
                        </select>
                    </div>
                </PopupForm>
            </form> */}
        </>
    );
}
