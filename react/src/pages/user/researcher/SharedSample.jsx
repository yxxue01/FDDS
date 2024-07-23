import { useEffect, useRef, useState } from "react";
import axiosClient from "../../../../axios-client";
import SideNavbar from "../../../components/SideNavBar";
import { Link, useParams } from "react-router-dom";
import SampleTable from "../../../components/SampleTable";
import Loading from "../../../components/Loading";
import Popup from "../../../components/Popup";
import PopupForm from "../../../components/PopupForm";
import fileDownload from "js-file-download";

export default function SharedSample() {
    const [site, setSite] = useState({});
    const [sample, setSample] = useState([]);
    const [loading, setLoading] = useState(false);
    const [display, setDisplay] = useState(false);
    const [display2, setDisplay2] = useState(false);
    const [upload, setUpload] = useState(true);
    const [file,setFile] = useState();
    const idinput = useRef();
    let { id } = useParams();


    useEffect(() => {
        getDataset();
        setUpload(true)
    }, []);

    const getDataset = () => {
        setLoading(true);
        axiosClient.get("/researcher/site/" + id).then(({ data }) => {
            setSite(data.data);
            setSample(data.data.samples);
            setLoading(false);
        });
    };
    const onSubmit = (event) => {
        event.preventDefault()
        setLoading(true)
        const formData = new FormData()
        
        formData.append('file',file)
        formData.append('id',idinput.current.value)
        axiosClient.post("/researcher/sample/import", formData,{
            headers: {"Content-Type":"multipart/form-data"},
            method: "post"
        })
        .then(() => {
            setDisplay(false);
            getDataset();
        }).catch(()=>{
            console.log("problem")
        })
    };

    const onDelete = (id) => {
        if (!window.confirm("Are you sure to delete sample?")) return;
        console.log(id);
        axiosClient.delete("/researcher/sample/" + id).then(() => getDataset());
    };

    const onDownload = () =>{
        setLoading(true)
        axiosClient.get('/researcher/sample/export/'+id,{
            method:'GET',
            responseType: 'blob',
        })
        .then((res)=>{
            setLoading(false)
            fileDownload(res.data, 'dataset.xlsx')
        })
    }

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
                            {site.siteName}
                        </h1>
                    </div>
                </div>
                <div className="ml-14 mt-4 flex justify-end px-14 gap-4">
                    <button
                        type="button"
                        onClick={onDownload}
                        class="bg-transparent  text-blue-700  py-2.5 px-4 border border-blue-700  font-medium rounded-lg text-sm"
                    >
                        <i class="fa-solid fa-download"></i>
                        &nbsp; Download .csv
                    </button>
                    <button
                        type="button"
                        onClick={() => setDisplay(true)}
                        class="text-white bg-blue-700 font-medium rounded-lg text-sm px-4 py-2.5"
                    >
                        <i class="fa-solid fa-plus"></i>
                        &nbsp; Add Sample
                    </button>
                </div>
                <div className="w-full px-14 mt-6">
                    {loading && <Loading />}
                    <SampleTable samples={sample} onDelete={onDelete} />
                </div>
            </div>
            <Popup display={display} setDisplay={setDisplay}>
                <div className="flex flex-col w-full items-center gap-4 mb-4">
                    <h3 class="mb-3 text-2xl font-bold text-white">
                        Choose Method
                    </h3>
                    <div className="flex">
                        <button
                            type="button"
                            onClick={() => {
                                setDisplay2(true)
                                setDisplay(false)
                            }}
                            class="bg-transparent  text-white  py-2.5 px-4 border border-white  font-medium rounded-lg text-sm w-[80%]"
                        >
                            <i class="fa-solid fa-upload"></i>
                            &nbsp; Upload .csv
                        </button>
                        <button
                            type="button"
                            class="bg-transparent basis-[30%] text-white  py-2.5 px-4 border border-white  font-medium rounded-lg text-sm w-[80%]"
                        >
                            <i class="fa-solid fa-paperclip"></i>
                        </button>
                    </div>
                    
                    <div className="h-[2px] bg-blue-600 w-[60%]"></div>
                    <Link
                        to={'/researcher/'+id+'/samplecreate'}
                        class="text-white bg-blue-700 font-medium rounded-lg text-sm px-4 py-2.5 w-[80%] flex justify-center"
                    >
                        <i class="fa-regular fa-file"></i>
                        &nbsp; Fill In Form
                    </Link>
                </div>
            </Popup>
            <form onSubmit={onSubmit}>
            <PopupForm display={display2} setDisplay={setDisplay2}>
                <h3 class="mb-3 text-2xl font-bold text-white">
                    Drop your file here
                </h3>

                <input
                    class="block w-full text-sm text-white border border-gray-300 rounded-lg cursor-pointer bg-gray-600  focus:outline-none placeholder-gray-400"
                    aria-describedby="file_input_help"
                    type="file"
                    onChange={(e)=>{
                        setFile(e.target.files[0])
                    }}
                />
                <input type="hidden" ref={idinput} value={id}/>
            </PopupForm>
            </form>
        </>
    );
}
