import { useEffect, useState } from "react";
import axiosClient from "../../../../axios-client";
import SideNavbar from "../../../components/SideNavBar";
import { Link, useParams } from "react-router-dom";
import SiteTable from "../../../components/SiteTable";
import Loading from "../../../components/Loading";
import { useForm } from "react-hook-form";
import PopupForm from "../../../components/PopupForm";
import { toast } from "react-toastify";

export default function SiteList({ shared }) {
    const [dataset, setDataset] = useState({});
    const [sites, setSites] = useState([]);
    const [loading, setLoading] = useState(false);
    const [display, setDisplay] = useState(false);
    const { register, handleSubmit, getValues, setValue } = useForm({});
    let { id } = useParams();

    useEffect(() => {
        getDataset();
    }, []);

    const getDataset = () => {
        setLoading(true);
        axiosClient.get("/researcher/dataset/" + id).then(({ data }) => {
            setLoading(false);
            console.log(data);
            setDataset(data.data);
            setSites(data.data.sites);
        });
    };
    const onSubmit = () => {
        setLoading(true);
        setValue("dataset_id", id);
        axiosClient.post("/researcher/site", getValues()).then(({ data }) => {
            setDisplay(false);
            getDataset();
            toast.info(data.message);
        })
            .catch(({ response }) => {
                toast.error(response.data.message)
            })
    };
    const onDelete = (id) => {
        if (!window.confirm("Are you sure to delete the site?")) return;
        setLoading(true);
        axiosClient.delete("/researcher/site/" + id).then(() => {
            setLoading(false);
            getDataset();
        });
    };

    return (
        <>
            <SideNavbar />
            <div className="h-[50px] pl-[21%] pr-[1%] w-full flex flex-col pt-[16px]">
                <div className="flex items-center gap-4">
                    <Link
                        to={'/researcher/mydataset'}
                        className="h-[40px] flex flex-col justify-center items-center"
                    >
                        <img
                            className="h-full"
                            src="https://www.svgrepo.com/show/496822/back-square.svg"
                        ></img>
                    </Link>
                    <div className="flex flex-col">
                        <h1 className="text-[30px] font-cabin font-bold">
                            {dataset.datasetTitle}
                        </h1>
                        <h2 className="text-[15px] font-cabin">
                            at {dataset.state}
                        </h2>
                    </div>
                </div>
                {!shared &&
                    <div className="ml-14 mt-4">
                        <button
                            type="button"
                            onClick={() => setDisplay(true)}
                            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 focus:outline-none"
                        >
                            <i class="fa-solid fa-plus"></i>
                            &nbsp; Create Site
                        </button>
                    </div>
                }
                <div className="w-full px-14 mt-6">
                    {loading && <Loading />}
                    <SiteTable shared={shared} sites={sites} onDelete={onDelete} which={'samplelist'} />
                    {!loading && sites.length === 0 && (
                        <div className="w-full flex justify-center items-center h-[100px]">
                            <h1 className="font-dmsans text-xl">You dont have any sites in this dataset, create one!</h1>
                        </div>
                    )}
                </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <PopupForm display={display} setDisplay={setDisplay}>
                    <h3 class="mb-3 text-2xl font-bold text-white">
                        Site Form
                    </h3>
                    <div>
                        <label class="block mb-2 text-sm font-medium text-white">
                            Site Name
                        </label>
                        <input
                            type="text"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            {...register("siteName")}
                            required
                        />
                    </div>
                    <div>
                        <label class="block mb-2 text-sm font-medium text-white">
                            Latitude
                        </label>
                        <input
                            type="number"
                            step="any"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            {...register("latitude")}
                            required
                        />
                    </div>
                    <div>
                        <label class="block mb-2 text-sm font-medium text-white">
                            Longitude
                        </label>
                        <input
                            type="number"
                            step="any"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            {...register("longitude")}
                            required
                        />
                    </div>
                    <input type="hidden" {...register("dataset_id")} />
                </PopupForm>
            </form>
        </>

    );
}
