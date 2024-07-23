import { useEffect, useState } from "react";
import axiosClient from "../../../../axios-client";
import SideNavbar from "../../../components/SideNavBar";
import { Link, useParams } from "react-router-dom";
import SiteTable from "../../../components/SiteTable";
import Loading from "../../../components/Loading";
import { useForm } from "react-hook-form";

export default function SharedSite() {
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
        axiosClient.get("/researcher/dataset/" + 1).then(({ data }) => {
            setLoading(false);
            console.log(data);
            setDataset(data.data);
            setSites(data.data.sites);
        });
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
                        to=""
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

                <div className="w-full px-14 mt-6">
                    {loading && <Loading />}
                    <SiteTable sites={sites} onDelete={onDelete} which={'sharedsample'}/>
                    {!loading && sites.length===0 && (
                        <div className="w-full flex justify-center items-center h-[100px]">
                            <h1 className="font-dmsans text-xl">You dont have any sites in this dataset, create one!</h1>
                        </div>
                    )}
                </div>
            </div>

        </>

    );
}
