import Navbar from "../../components/Navbar"
import Footer from '../../components/footer'
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axiosClient from "../../../axios-client"
import { useStateContext } from "../../contexts/ContextProvider"


export default function SpeciesDetails() {

    const { id } = useParams()
    const [gallery, setGallery] = useState()
    const [fetch, setFetch] = useState(false)

    const { addition2 } = useStateContext()

    useEffect(() => {
        if (!fetch)
            fetchGallery()
    }, [gallery])

    const fetchGallery = async () => {
        const { data } = await axiosClient.get(`/loadGallery/${id}`)
        if (data.length < 1)
            setGallery(null)
        else
            setGallery(data)
        setFetch(true)
    }

    const species = addition2 && addition2.find(item => item.id == id)

    // const species = Array.isArray(addition2) ? addition2.find(item => item.id == id) : null

    return (
        <>
            <Navbar />
            <div id="content" className="mt-[120px] w-full mb-[100px] min-h-screen">
                <>
                    <div className="w-full px-[10%]">
                        <h2 className="text-xl font-roboto-bold-italic text-slate-600">Species Name</h2>
                        <h1 className="text-4xl font-roboto-bold-italic text-slate-800">{species && species.speciesName}</h1>
                        <h2 className="font-bold text-lg mt-4">Information</h2>
                        <div className='h-[2px] w-[30%] rounded-md bg-slate-500'></div>
                        <div className="bg-slate-200 p-4 mt-6 max-w-[60%] rounded-xl">
                            <ul className="mt-2 w-full text-justify">
                                <li><span className="font-bold">Color:</span> {species && species.color != null && species.color}{species && species.color == null && <span className="text-sm">No records yet.</span>}</li>
                                <li><span className="font-bold">Size:</span> {species && species.size != null && species.color}{species && species.size == null && <span className="text-sm">No records yet.</span>}</li>
                                <li><span className="font-bold">Distribution:</span> {species && species.distribution != null && species.color}{species && species.distribution == null && <span className="text-sm">No records yet.</span>}</li>
                            </ul>
                        </div>

                        <div className="bg-slate-400 p-6 mt-6 max-w-[60%] rounded-xl">
                            <h1 className="font-bold">Remarks</h1>
                            <p className="font-dmsans">{species && species.remarks != null && species.remarks}{species && species.remarks == null && <span className="text-sm">No records yet.</span>}</p>
                        </div>
                    </div>
                    <div className="flex flex-col grow items-center mt-20">
                        <h1 className="text-[32px] font-cabin font-bold py-0">
                            Gallery
                        </h1>
                        {gallery &&
                            <p className=""><span className="text-blue-700 font-bold text-xl">{Object.keys(gallery).length}</span> out of {gallery[0].count} photos</p>
                        }
                        <div className='w-full flex justify-center mt-2'>
                            <div className='h-[2px] w-[30%] rounded-md bg-slate-500'></div>
                        </div>
                        {gallery && Object.keys(gallery).length < gallery[0].count &&
                            <p onClick={fetchGallery} className="text-slate-500 text-sm mt-2 hover:text-blue-400 cursor-pointer"><i class="fa-solid fa-arrows-rotate"></i> Re-Generate Images</p>
                        }
                        <div className="w-[80%] flex gap-4 flex-wrap justify-center mt-4">
                            {gallery && gallery.map(item =>
                                <div className="group min-w-[200px] max-w-[300px] overflow-hidden border-[2px] border-black rounded-lg relative">
                                    <img className="w-full" src={item.photo} />
                                    <div className=" p-4 absolute bottom-0 left-0 right-0 h-1/3 bg-slate-600/80 w-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <p className="text-sm text-white font-dmsans">email: <span className=" underline text-blue-300">{item.email}</span></p>
                                        <p className="text-sm text-white font-dmsans">captured by: {item.username}</p>
                                    </div>
                                </div>
                            )}
                            {!gallery && 
                            <div className="text-lg">
                                No records
                            </div>
                            }
                        </div>
                    </div>
                </>
            </div>
            <Footer />
        </>
    )
}