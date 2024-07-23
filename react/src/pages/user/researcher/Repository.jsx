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


export default function Repository() {
    const [dataset, setDataset] = useState();
    const [available, setAvailable] = useState(true);
    const [loading, setLoading] = useState(false);
    const [display, setDisplay] = useState(false);
    const [display2, setDisplay2] = useState(false);
    const [query, setQuery] = useState("")
    const [visible, setVisible] = useState({ 'johor': true });
    const [upload, setUpload] = useState(true);
    const [file, setFile] = useState();
    const idinput = useRef();
    let { id } = useParams();
    const { register, handleSubmit, getValues, reset } = useForm();

    useEffect(() => {
        if (!dataset)
            getResource()
    }, [dataset]);

    const filteredItems = dataset ? dataset.filter(item => {
        return item.state.toLowerCase().includes(query.toLowerCase())
    }) : null

    const getResource = () => {
        setLoading(true);
        axiosClient.get("/repository").then(({ data }) => {
            setDataset(data.data);
            data.data.length < 1 ? setAvailable(true) : setAvailable(false)
            setLoading(false)
        });
    };
    const onSubmit = (datasetId) => {
        setLoading(true)
        const formData = new FormData()
        formData.append('datasetId', datasetId)
        axiosClient.post("/repository/request", formData)
            .then(({data}) => {
                toast.info(data.message)
                setLoading(false)
                getResource()
            }).catch(() => {
                console.log("problem")
            })
    };

    return (
        <>
            <SideNavbar />
            <div className="h-[50px] pl-[21%] pr-[1%] w-full flex flex-col pt-[16px]">
                <div className="flex items-center gap-4">
                    <div className="flex flex-col">
                        <h1 className="text-[30px] font-cabin font-bold">
                            Dataset Repository
                        </h1>
                    </div>
                </div>
                <div className="ml-0 mt-10 flex justify-start px-14 gap-4">
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
                </div>
                <div className="w-full px-14 mt-6">
                    {loading && <Loading />}
                    <div className="border w-full mb-4" />
                    {available && 
                        (<h1 className="mt-10 text-xl text-gray-400 w-full text-center">The dataset for request is not available</h1>)
                    }
                    {filteredItems && filteredItems.map(item =>
                    (
                        <div className="border w-full flex justify-between items-center p-4 rounded-lg shadow-lg mb-4">
                            <div className="basis-[40%]">
                                <div className="font-bold text-lg  text-gray-900 ">{item.datasetTitle}</div>
                                <div className="text-sm font-medium text-gray-900 text-wrap"><span className="font-bold text-sm  text-gray-900">by</span> {item.researcher}</div>
                            </div>
                            <div className="flex flex-col">
                                <div className="flex items-center gap-2 self-start">
                                    <i class="fa-solid fa-location-crosshairs"></i>
                                    <div className="text-sm font-medium text-gray-900">{item.state}</div>
                                </div>
                                <div className="flex items-center gap-2 self-start">
                                    <i class="fa-solid fa-sitemap"></i>
                                    <div className="text-sm font-medium text-gray-900">{item.site_count} Stations</div>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    onClick={() => onSubmit(item.dataset_id)}
                                    class="text-blue-700 bg-white border-[2px] border-blue-700 text-sm rounded-lg px-4 py-2.5 flex items-center justify-center"
                                >
                                    <i class="fa-solid fa-code-pull-request"></i>
                                    &nbsp; Request
                                </button>
                                <Link
                                    to={`/researcher/repository/${item.dataset_id}`}
                                    class="text-white bg-blue-700 font-medium rounded-lg text-sm px-4 py-2.5 flex items-center justify-center"
                                >
                                    <i class="fa-regular fa-eye"></i>
                                    &nbsp; View
                                </Link>
                            </div>
                        </div>
                    )
                    )}
                </div>
            </div>
        </>
    );
}
