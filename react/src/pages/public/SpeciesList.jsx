import Navbar from "../../components/Navbar"
import Second from '../../components/publicContent/Second'
import Footer from '../../components/footer'
import fish from '../../assets/images/fish_discovery.jpg'
import map from "../../assets/icons/map.svg"
import index from "../../assets/icons/index.svg"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useStateContext } from "../../contexts/ContextProvider";


export default function SpeciesList() {
    const { id } = useParams();
    const { addition1, addition2 } = useStateContext()
    const navigate = useNavigate();

    const family = addition1 && addition1[id]
    const species = addition2 && addition2.filter(item => item.fishinfo_id === family.id)

    return (
        <>
            <Navbar />
            <div id="content" className="mt-[120px] w-full mb-[100px] min-h-screen">
                <>
                    <div className="w-full px-[10%]">
                        <h2 className="text-xl font-roboto-bold-italic text-slate-600">Family Name</h2>
                        <h1 className="text-4xl font-roboto-bold-italic text-slate-800">{family && family.familyName}</h1>
                        <div className="bg-slate-400 p-6 mt-6 max-w-[60%] rounded-xl">
                            <h1 className="font-bold">Remarks</h1>
                            {family && 
                            <p className="font-dmsans">{family.background != null && family.background}{family.background == null && <span>No records yet.</span>}</p>
                            }
                        </div>
                    </div>
                    <div className="flex flex-col grow items-center mt-20">
                        <h1 className="text-[32px] font-cabin font-bold py-0">
                            All Species In {family && family.familyName}
                        </h1>
                        <p className=""><span className="text-blue-700 font-bold text-xl">{species && species.length}</span> species in total</p>
                        <div className='w-full flex justify-center mt-4'>
                            <div className='h-[2px] w-[30%] rounded-md bg-slate-500'></div>
                        </div>
                        {species && species.length < 1 &&
                            <h1 className="text-xl mt-6">No records yet.</h1>
                        }
                        <ul className=" w-[80%] flex flex-wrap gap-6 text-md mt-6 justify-center">
                            {species && species.map((item,index) =>
                                <li onClick={()=>navigate(`/discovery/details/${item.id}`)} className="p-2 w-fit rounded-md border-[2px] cursor-pointer flex gap-4 bg-white shadow-lg mb-1">{item.speciesName}</li>
                            )}

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