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


export default function RepoDetails() {
    const [resource, setResource] = useState();
    const [species, setSpecies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [display, setDisplay] = useState(false);
    const [display2, setDisplay2] = useState(false);
    const [upload, setUpload] = useState(true);
    const [toggleView, setToggleView] = useState([])
    const [file, setFile] = useState();
    const idinput = useRef();
    let { id } = useParams();
    const { register, handleSubmit, getValues, reset } = useForm();

    useEffect(() => {
        if (!resource) {
            getResource();
        } else {
            console.log(resource ? "yes" : "no")
            setToggleView(new Array(Object.keys(resource.sites).length).fill(false))
            resource.sites.map(item => {
                console.log(item)
                let species = []
                item.species.map(item => {
                    species = [...species, item.speciesName]
                })
                setSpecies(prevArray => {
                    prevArray = [...prevArray, species.filter((item, index) => {
                        return species.indexOf(item) === index
                    })]
                    return prevArray
                })
            })
            // resource.sites.map((item, index) => {
            //     const value = item.species.filter((target, index) => {
            //         console.log(item.species.indexOf(target), index)
            //         return item.species.indexOf(target) === index
            //     })
            //     // console.log(value)
            //     // setSpecies(species => {
            //     //     const newArray = [...species]
            //     //     newArray[index] = value
            //     //     return newArray
            //     // })
            // })
            // console.log(species)
        }
    }, [resource]);

    const getResource = () => {
        setLoading(true);
        axiosClient.get("/repository/" + id).then(({ data }) => {
            setResource(data.data[0]);
            setLoading(false)
        });
    };


    const onToggle = (index) => {
        setToggleView(prevStates => {
            const newStates = [...prevStates];
            newStates[index] = !newStates[index];
            return newStates;
        });
        console.log(index)
    }

    return (
        <>
            <SideNavbar />
            <div className="h-[50px] pl-[21%] pr-[1%] w-full flex flex-col pt-[16px]">
                <div className="flex items-center gap-4">
                    <div className="flex flex-col">
                        <h1 className="text-[30px] font-cabin font-bold">
                            {resource && resource.datasetTitle}
                        </h1>
                        <p><span className="font-bold">by</span> {resource && resource.researcher}</p>
                    </div>
                </div>
                <div className="ml-2 mt-6 flex justify-center px-14 gap-4 ">
                    <div className="font-bold text-lg">Stations Available</div>
                </div>
                <div className="w-full px-14 mt-2">
                    {loading && <Loading />}
                    <div className="border w-full mb-4" />
                    {resource &&
                        resource.sites.map((item, index) => {
                            return <>
                                <div className="border w-full flex justify-between items-center p-4 rounded-lg shadow-lg mb-2">
                                    <div className=" basis-[60%]">
                                        <div className="font-bold text-lg  text-gray-900 ">{item.siteName}</div>
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <i class="fa-solid fa-location-crosshairs"></i>
                                            <a href={`https://www.google.com/maps/place/${item.latitude},${item.longitude}`} target="_blank" className="underline text-sm font-medium text-blue-500">{item.latitude}, {item.longitude}</a>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <i class="fa-solid fa-fish"></i>
                                            <div className="text-sm font-medium text-gray-900">{item.sample}</div>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        
                                        <button
                                            type="button"
                                            onClick={() => onToggle(index)}
                                            class="text-white bg-blue-700 font-medium rounded-lg text-sm px-4 py-2.5"
                                        >
                                            <i class="fa-regular fa-eye"></i>
                                            &nbsp; View
                                        </button>
                                    </div>
                                </div>
                                {toggleView[index] && (
                                    <div className=" border-[2px] p-6 rounded-lg bg-slate-200 animate-slideIn ">
                                        <div className="text-sm font-bold">Species</div>
                                        <ul className="flex flex-wrap gap-x-10 gap-y-2 text-sm list-disc p-4">
                                            {species[index].map((species) => (
                                                <li>{species}</li>
                                            )
                                            )}
                                        </ul>
                                    </div>
                                )}
                            </>
                        })
                    }

                </div>
            </div>
        </>
    );
}
