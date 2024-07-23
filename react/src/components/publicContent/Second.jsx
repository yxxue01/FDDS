import fish from '../../assets/images/fish_discovery.jpg'
import map from "../../assets/icons/map.svg"
import index from "../../assets/icons/index.svg"

import { Link } from "react-router-dom"

export default function Second(){
    return (
        <>
            <div className="flex px-32 justify-between items-center">
                <div className="flex basis-[60%] flex-col gap-10">
                    <h1 className="font-cabin font-bold text-[40px] leading-none">
                        Fish Discovery
                    </h1>
                    <p className="font-dmsans text-[18px] font-medium">
                    “Uncover the bounty of locally sourced sea fish, now revealed and conveniently accessible in our curated repository.”
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
            <div className='w-full flex justify-center mt-20'>
            <div className='h-[2px] w-[80%] rounded-md bg-slate-500'></div>
            </div>
            <div className="flex flex-col grow gap-4 items-center mt-10">
                        <h1 className="text-[32px] font-cabin font-bold">
                            Explore More
                        </h1>
                        <div className="flex justify-center w-full gap-6 mt-5 ">
                            <Link to='#'  className="bg-blue-300 h-[130px] text-xl flex justify-center items-center border-2 rounded-md border-black w-[30%] px-2 hover:scale-105 transition duration-200">
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
                        </div>
                    </div>
        </>
    )
}