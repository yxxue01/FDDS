import { useEffect, useRef, useState } from "react";
import axiosClient from "../../../../axios-client";
import SideNavbar from "../../../components/SideNavBar";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loading from "../../../components/Loading";
import { useForm } from "react-hook-form";
import SampleCreateForm from "../../../components/SampleCreateForm";
import { toast } from "react-toastify";

export default function SampleCreate() {
    const [loading, setLoading] = useState(false);
    const [species, setSpecies] = useState([]);
    const [upload, setUpload] = useState(false);
    const [image, setImage] = useState({});
    const {register, handleSubmit, getValues} = useForm();
    const [toggleType, setToggleType] = useState(null);

    const navigate = useNavigate()


    let { id } = useParams();

    useEffect(() => {
        setLoading(true);
        axiosClient.get("/researcher/species").then(({ data }) => {
            setSpecies(data.data);
            setLoading(false);
        });
    }, []);

    const onChange = (type) => {
        setToggleType(type)
    }

    const onSubmit = () => {
        setLoading(true);
        const form = new FormData();
        const file = document.getElementById("image");
        const values = getValues();
        Object.entries(values).forEach(([key, value]) => {
            form.append(key, value);
        });
        form.append("type",toggleType)
        form.append("data", file.files[0]);
        form.append("site_id",id);
        axiosClient.post("/researcher/sample", form, {
            headers:{
                "Content-Type":"multipart/form-data"
            },
            method:"post"
        }).then(() => {
            navigate(`/researcher/${id}/samplelist`)
        }).catch(()=>{
            setLoading(false)
        })
    };

    const saveImage = (ev) => {
        const file = ev.target.files[0];
        setImage(URL.createObjectURL(file));
        setUpload(true);
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
                            Sample Form
                        </h1>
                    </div>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="ml-14 mt-4 flex justify-end px-14 gap-4">
                        <button
                            type="button"
                            class="bg-transparent  text-red-700  py-2.5 px-4 border border-red-700  font-medium rounded-lg text-sm"
                            onClick={() => {
                                navigate(`/researcher/${id}/samplelist`)
                            }}
                        >
                            <i class="fa-solid fa-ban"></i>
                            &nbsp; Cancel
                        </button>
                        <button
                            type="submit"
                            class="text-white bg-blue-700 font-medium rounded-lg text-sm px-4 py-2.5"
                        >
                            <i class="fa-regular fa-floppy-disk"></i>
                            &nbsp; Create
                        </button>
                    </div>
                    <div className="w-full px-14 mt-6">
                        {loading && <Loading />}
                        <SampleCreateForm
                            species={species}
                            upload={upload}
                            saveImage={saveImage}
                            image={image}
                            register={register}
                            toggleType={toggleType}
                            onChange={onChange}
                        >
                        </SampleCreateForm>
                    </div>
                </form>
            </div>
        </>
    );
}
