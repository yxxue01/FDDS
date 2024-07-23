import Navbar from "../../components/Navbar"
import Second from '../../components/publicContent/Second'
import Footer from '../../components/footer'
import fish from '../../assets/images/discovery.jpg'
import map from "../../assets/icons/map.svg"
import index from "../../assets/icons/index.svg"
import { Link, useNavigate } from "react-router-dom"
import { useStateContext } from "../../contexts/ContextProvider";
import { useEffect, useState } from "react"
import axiosClient from "../../../axios-client"


export default function Discovery() {

    const navigate = useNavigate()

    const { addition1 } = useStateContext()


    return (
        <>
            <Navbar />
            <div id="content" className="mt-[120px] w-full mb-[100px] min-h-screen">
                <>
                    <div className="flex px-32 justify-between items-center gap-2">
                        <div className="flex basis-[60%] flex-col gap-10">
                            <h1 className="font-cabin font-bold text-[40px] leading-none">
                                Malaysia Fish Discovery
                            </h1>
                            <p className="font-dmsans text-[18px] font-medium">
                                “Diversity of fish data and information, now conveniently accessible in our digitalized repository”
                            </p>
                        </div>
                        <div className="basis-[40%] rounded-md overflow-hidden">
                            <img
                                src={fish}
                                alt="community"
                                className="h-full w-full object-cover"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col grow items-center mt-20">
                        <h1 className="text-[32px] font-cabin font-bold py-0">
                            Fish Families In Malaysia
                        </h1>
                        {addition1 &&
                            <p className=""><span className="text-blue-700 font-bold text-xl">{Object.keys(addition1).length}</span> family in total</p>
                        }
                        <div className='w-full flex justify-center mt-4'>
                            <div className='h-[2px] w-[30%] rounded-md bg-slate-500'></div>
                        </div>
                        <ul className=" w-[80%] flex flex-wrap gap-6 text-md mt-6 justify-center">
                            {addition1 && Object.keys(addition1).map(item => (
                                <li onClick={() => navigate(`/discovery/${item}`)} className="p-2 w-fit rounded-md border-[2px] cursor-pointer flex gap-4 bg-white shadow-lg mb-1">{addition1[item].familyName}</li>
                            ))}
                        </ul>


                        {/* <div className="flex justify-center w-full gap-6 mt-5 ">
                            <Link to='#' className="bg-blue-300 h-[130px] text-xl flex justify-center items-center border-2 rounded-md border-black w-[30%] px-2 hover:scale-105 transition duration-200">
                                <div className="w-[100px]">
                                    <img
                                        src={map}
                                        alt="map"
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                                <p className="font-cabin ml-3">Uncover a diverse selection of sea treasures in our local seas.</p>
                            </Link>
                            <Link to='#' className="bg-blue-300 h-[130px] text-xl flex justify-center items-center border-2 rounded-md border-black w-[30%] px-2 hover:scale-105 transition duration-200">
                                <div className="w-[70px]">
                                    <img
                                        src={index}
                                        alt="index"
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                                <p className="ml-4 font-cabin w-fit">Navigate the depths of our fish index to uncover a tailored selection of specific catches.</p>
                            </Link>
                        </div> */}
                    </div>
                </>
            </div>
            <Footer />
        </>
    )
}