import { Link } from "react-router-dom"
import SideNavbar from "../../../components/SideNavBar";
import { useEffect, useState } from "react";
import axiosClient from "../../../../axios-client";
import Loading from "../../../components/Loading";
import PopupForm from "../../../components/PopupForm";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
export default function ManageInfo() {
    const [display, setDisplay] = useState(false);
    const [dataset, setDataset] = useState([]);
    const [query, setQuery] = useState(true);
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, getValues, setValue } = useForm({});

    // useEffect(() => {
    //     getDataset();
    // }, []);


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


    const onSubmit = (id, user_id, operation) => {
        setLoading(true);
        const form = new FormData()
        form.append('dataset_id', id)
        form.append('user_id', user_id)
        form.append('operation', operation)
        axiosClient.post("/repository/requestresult", form).then(({ data }) => {
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
                    Fish Information
                </h1>
                <div className="flex flex-wrap gap-2 justify-start mt-4 ">
                    <Link
                        to={'/researcher/createfamily'}
                        className="flex items-center p-4 bg-slate-400 h-[120px] rounded-lg max-w-[250px]"
                        style={{ backgroundImage: "url('https://png.pngtree.com/background/20230519/original/pngtree-some-clown-fish-swimming-in-an-ocean-picture-image_2656243.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}
                    >
                        <div className="w-[35px]">
                            <img
                                className="h-full"
                                src="https://www.svgrepo.com/show/468926/folder-add.svg"
                            ></img>
                        </div>
                        <p className=" text-yellow-200 text-lg font-bold">Register Fish Family</p>
                    </Link>
                    <Link
                        to='/researcher/updatefamily'
                        className="flex items-center p-4 bg-slate-400 h-[120px] rounded-lg max-w-[250px]"
                        style={{ backgroundImage: "url('https://cff2.earth.com/uploads/2023/07/17094959/Clownfish-species-scaled.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}
                    >
                        <div className="w-[35px]">
                            <img
                                className="h-full"
                                src="https://www.svgrepo.com/show/501824/setting-setting.svg"
                            ></img>
                        </div>
                        <p className=" text-white text-lg font-bold">Edit Fish Family</p>
                    </Link>
                    <Link 
                        to='/researcher/createspecies'
                    className="flex items-center p-4 bg-slate-400 h-[120px] rounded-lg max-w-[260px]"
                        style={{ backgroundImage: "url('https://cdn.pixabay.com/photo/2023/05/23/07/05/royal-gramma-basslet-8012082_1280.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}
                    >
                        <div className="w-[35px]">
                            <img
                                className="h-full"
                                src="https://www.svgrepo.com/show/468926/folder-add.svg"
                            ></img>
                        </div>
                        <p className=" text-blue-400 text-lg font-bold">Register Fish Species</p>
                    </Link>
                    <Link
                        to='/researcher/updatespecies'
                    className="flex items-center p-4 bg-slate-400 h-[120px] rounded-lg max-w-[250px]"
                        style={{ backgroundImage: "url('https://miro.medium.com/v2/resize:fit:1024/1*fKrSo5XVju1nxsPxNFtNTg.jpeg')", backgroundSize: 'cover', backgroundPosition: 'center' }}
                    >
                        <div className="w-[35px]">
                            <img
                                className="h-full"
                                src="https://www.svgrepo.com/show/501824/setting-setting.svg"
                            ></img>
                        </div>
                        <p className=" text-white text-lg font-bold">Edit Fish Species</p>
                    </Link>
                </div>
            </div>
        </>
    );
}
