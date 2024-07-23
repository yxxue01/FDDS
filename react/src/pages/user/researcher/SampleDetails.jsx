import { useEffect, useRef, useState } from "react";
import axiosClient from "../../../../axios-client";
import SideNavbar from "../../../components/SideNavBar";
import SampleForm from "../../../components/SampleForm";
import { Link, useParams } from "react-router-dom";
import Loading from "../../../components/Loading";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function SampleDetails({ shared }) {
    const [sample, setSample] = useState({});
    const [info, setInfo] = useState({});
    const [species, setSpecies] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(false);
    const [upload, setUpload] = useState(false);
    const [change, setChange] = useState(false);
    const [image, setImage] = useState(null);
    const [toggleType, setToggleType] = useState(null);
    const { register, handleSubmit, getValues, reset } = useForm();

    let { id } = useParams();

    useEffect(() => {
        if(shared)
            getShared()
        else{
        getDataset();
        getSpecies();
        }
        if (image != null)
            setUpload(true)
    }, [image, sample.photo]);
    const getSpecies = async () => {
        setLoading(true);
        const { data } = await axiosClient.get("/researcher/species");
        setSpecies(data.data);
        setLoading(false);
    };

    const onChange = (type) => {
        setToggleType(type)
    }

    const getShared = async () =>{
        setLoading(true);
        const { data } = await axiosClient.get("/researcher/sample/shared/" + id);
        if (data.data.type != null) {
            onChange(data.data.type)
        }
        setSample(data.data);
        setInfo(data.data.info);
        if (sample.photo != null && !change)
            setImage(sample.photo)
        setLoading(false);
        reset({});
    }

    const getDataset = async () => {
        setLoading(true);
        const { data } = await axiosClient.get("/researcher/sample/" + id);
        if (data.data.type != null) {
            onChange(data.data.type)
        }
        setSample(data.data);
        setInfo(data.data.info);
        if (sample.photo != null && !change)
            setImage(sample.photo)
        setLoading(false);
        reset({});
    };

    const saveImage = (ev) => {
        const file = ev.target.files[0];
        setImage(URL.createObjectURL(file));
        setUpload(true);
        setChange(true)
    };

    const onSubmit = () => {
        setLoading(true);
        const file = document.getElementById("image");
        const form = new FormData();
        const values = getValues();

        Object.entries(values).forEach(([key, value]) => {
            form.append(key, value);
        });

        form.append("data", file.files[0]);
        form.append("type", toggleType);
        axiosClient
            .post("researcher/sample/update/" + sample.id, form, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                method: "post"
            })
            .then(() => {
                getDataset();
                setLoading(false);
                setEditMode(!editMode);
            });
        setLoading(false);


    };

    return (
        <>
            <SideNavbar />
            <div className="h-[50px] pl-[21%] pr-[1%] w-full flex flex-col pt-[16px]">
                <div className="flex items-center gap-4">
                    <Link
                        to="/researcher/mydataset"
                        className="h-[40px] flex flex-col justify-center items-center"
                    >
                        <img
                            className="h-full"
                            src="https://www.svgrepo.com/show/496822/back-square.svg"
                        ></img>
                    </Link>
                    <div className="flex flex-col">
                        <h1 className="text-[30px] font-cabin font-bold">
                            Sample Details
                        </h1>
                    </div>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="ml-14 mt-4 flex justify-end px-14 gap-4">
                        {editMode && (
                            <>
                                <button
                                    type="button"
                                    class="bg-transparent  text-red-700  py-2.5 px-4 border border-red-700  font-medium rounded-lg text-sm"
                                    onClick={() => window.location.reload()}
                                >
                                    <i class="fa-solid fa-ban"></i>
                                    &nbsp; Cancel
                                </button>
                                <button
                                    type="submit"
                                    class="text-white bg-blue-700 font-medium rounded-lg text-sm px-4 py-2.5"
                                >
                                    <i class="fa-regular fa-floppy-disk"></i>
                                    &nbsp; Save Changes
                                </button>
                            </>
                        )}
                        {!editMode && !shared && (
                            <>
                                <button
                                    type="button"
                                    class="text-white bg-blue-700 font-medium rounded-lg text-sm px-4 py-2.5"
                                    onClick={() => setEditMode(true)}
                                >
                                    <i class="fa-regular fa-pen-to-square"></i>
                                    &nbsp; Edit
                                </button>
                            </>
                        )}
                    </div>
                    <div className="w-full px-14 mt-6">
                        {loading && <Loading />}
                        <SampleForm
                            editMode={editMode}
                            sample={sample}
                            info={info}
                            species={species}
                            upload={upload}
                            register={register}
                            saveImage={saveImage}
                            image={image}
                            toggleType={toggleType}
                            onChange={onChange}
                            shared={shared}
                        />
                    </div>
                </form>
            </div>
        </>
    );
}
