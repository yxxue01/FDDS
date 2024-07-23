import { Link } from "react-router-dom"
import SideNavbar from "../../../components/SideNavBar";
import { useEffect, useState } from "react";
import axiosClient from "../../../../axios-client";
import Loading from "../../../components/Loading";
import PopupForm from "../../../components/PopupForm";
import { useForm } from "react-hook-form";
export default function Mydataset() {
    const [display, setDisplay] = useState(false);
    const [dataset, setDataset] = useState([]);
    const [shared, setShared] = useState([]);
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, getValues, setValue } = useForm({});

    useEffect(() => {
        getDataset();
    }, []);

    const getDataset = async () => {
        setLoading(true);
        const [data1, data2] = await Promise.all([
            axiosClient.get('/researcher/dataset'),
            axiosClient.get('/dataset/shared')
        ]);
        setDataset(data1.data.data);
        setShared(data2.data.data)
        console.log(data1)
        setLoading(false);
    };

    const onSubmit = () => {
        setLoading(true);
        setValue("id", 1);
        axiosClient.post("/researcher/dataset", getValues()).then(() => {
            setDisplay(false);
            getDataset();
        });
    };

    const onDelete = (id) => {
        if (!window.confirm("Are you sure to delete the dataset?")) return;
        setLoading(true);
        axiosClient.delete("/researcher/dataset/" + id).then(() => {
            setLoading(false);
            getDataset();
        });
    };

    const unbind = (id) => {
        if (!window.confirm("Are you sure to unbind the dataset?")) return;
        setLoading(true);
        axiosClient.post("/researcher/dataset/unbind/" + id).then(() => {
            setLoading(false);
            getDataset();
        });
    };

    return (
        <>
            <SideNavbar />
            <div className="h-[50px] pl-[21%] pr-[1%] w-full flex flex-col pt-[16px]">
                <h1 className="py-[20px] text-[30px] font-cabin font-bold">
                    My Datasets
                </h1>
                <button
                    type="button"
                    onClick={() => setDisplay(true)}
                    class="text-white bg-blue-700 hover:bg-blue-800 w-fit focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none"
                >
                    Create New
                </button>
                <div className="flex flex-wrap gap-2 justify-start mt-4">
                    {loading && <Loading />}
                    {dataset.map((d) => (
                        <div className="h-[100px] w-[20%] border-gray-500 border-[2px] rounded-md flex justify-between items-center px-4 gap-2">
                            <Link
                                to={"/researcher/" + d.dataset_id + "/sitelist"}
                                className="flex flex-col basis-[80%] justify-start"
                            >
                                <p className="font-cabin font-bold text-xl">
                                    {d.datasetTitle}
                                </p>
                                <p className="font-cabin text-sm">State: {d.state}</p>
                            </Link>
                            <div
                                onClick={() => onDelete(d.dataset_id)}
                                className="flex justify-end grow hover:scale-125 cursor-pointer transition duration-200"
                            >
                                <div className="h-[40px]">
                                    <img
                                        className="h-full"
                                        src="https://www.svgrepo.com/show/527928/trash-bin-trash.svg"
                                    ></img>
                                </div>
                            </div>
                        </div>
                    ))}
                    {!loading && dataset.length === 0 && (
                        <div className="w-full flex justify-center items-center h-[100px]">
                            <h1 className="font-dmsans text-xl">
                                You dont have any dataset, create one!
                            </h1>
                        </div>
                    )}
                </div>
                {shared && shared.length > 0 &&
                    <h1 className="py-[20px] text-[30px] font-cabin font-bold">
                        Shared Dataset
                    </h1>
                }

                <div className="flex flex-wrap gap-2 justify-start mt-4">
                    {shared.map((d) => (
                        <div className=" p-2 border-gray-500 border-[2px] rounded-md flex justify-between items-center px-4 gap-4">
                            <Link
                                to={"/researcher/" + d.dataset_id + "/sharedsitelist"}
                                className="flex flex-col basis-[100%] justify-start"
                            >
                                <p className="font-cabin font-bold text-xl">
                                    {d.datasetTitle}
                                </p>
                                <div className="text-sm">
                                    <p className="font-cabin">State: {d.state}</p>
                                    <p className="font-cabin">Owner: {d.username}</p>
                                    <p className="font-cabin">Email: {d.email}</p>
                                </div>

                            </Link>
                            <div
                                onClick={() => unbind(d.dataset_id)}
                                className="flex justify-end grow hover:scale-125 cursor-pointer transition duration-200 "
                            >
                                <i class="fa-solid fa-link-slash fa-xl"></i>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
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
            </form>
        </>
    );
}
