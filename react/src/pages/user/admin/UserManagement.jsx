import { useEffect, useState } from "react";
import axiosClient from "../../../../axios-client";
import SideNavbar from "../../../components/SideNavBar";
import { Link, useParams } from "react-router-dom";
import SiteTable from "../../../components/SiteTable";
import Loading from "../../../components/Loading";
import { useForm } from "react-hook-form";
import PopupForm from "../../../components/PopupForm";
import UserTable from "../../../components/UserTable";
import SearchButton from "../../../components/SearchButton";
import FilterButton from "../../../components/FilterButton";

export default function UserManagement() {
    const [dataset, setDataset] = useState({});
    const [sites, setSites] = useState([]);
    const [loading, setLoading] = useState(false);
    const [display, setDisplay] = useState(false);
    const { register, handleSubmit, getValues, setValue } = useForm({});
    let { id } = useParams();

    useEffect(() => {
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
        axiosClient.post("/researcher/site", getValues()).then(() => {
            setDisplay(false);
            getDataset();
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
            <div className="h-[50px] pl-[21%] pr-[1%] w-full flex flex-col p-content">
                <div className="flex items-center justify-center gap-4 pl-13">
                    <div className="flex flex-col">
                        <h1 className="text-title font-cabin font-bold">
                            User Management
                        </h1>
                    </div>
                </div>
                <div className="ml-13 mt-4 flex items-center justify-center">
                    <FilterButton/>
                    <SearchButton/>
                </div>
                <div className="w-full px-13 mt-6">
                    {loading && <Loading />}
                    <UserTable/>
                    {!loading && sites.length===0 && (
                        <div className="w-full flex justify-center items-center h-[100px]">
                            <h1 className="font-dmsans text-xl">No Registered User Yet...</h1>
                        </div>
                    )}
                </div>
            </div>
        </>

    );
}
