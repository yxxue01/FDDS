import { useEffect, useRef, useState } from "react";
import axiosClient from "../../../../axios-client";
import SideNavbar from "../../../components/SideNavBar";
import { Link, useParams } from "react-router-dom";
import SampleTable from "../../../components/SampleTable";
import Loading from "../../../components/Loading";
import Popup from "../../../components/Popup";
import PopupForm from "../../../components/PopupForm";
import fileDownload from "js-file-download";
import { toast } from "react-toastify";

export default function ManageUsers() {
    const [user, setUser] = useState({});
    const [query, setQuery] = useState("")
    const [list, setList] = useState(null);
    const [selectedFam, setSelectedFam] = useState(null);
    const [operation, setOperation] = useState(null);
    const [toggle, setToggle] = useState([])
    const [loading, setLoading] = useState(false);
    const [isEditor, setIsEditor] = useState(false);
    const [display2, setDisplay2] = useState(false);
    const [upload, setUpload] = useState(false);
    const [file, setFile] = useState();
    const [userid,setUserid] = useState(null);
    let { id } = useParams();


    useEffect(() => {
        if (!upload)
            getResource()
    }, [user, selectedFam]);

    const filteredSearch = list ? list.filter(item => {
        return item.familyName.toLowerCase().includes(query.toLowerCase())
    }) : null

    const selected = selectedFam ? selectedFam.filter((item,index,self)=>
        index === self.findIndex((target)=>
            target.id === item.id
        )
    ) : null

    const removeEditor = async()=>{
        setLoading(true)
        const form = new FormData()
        form.append('id',userid)
        const {data} = await axiosClient.post('/admin/removeditor',form);
        setLoading(false)
        getResource()
    }

    const getResource = async () => {
        setLoading(true);
        axiosClient.get("/admin/userlist").then(({ data }) => {
            setUser(data)
            setToggle(() => {
                const newArray = []
                Object.keys(data).forEach(index => {
                    const hasEditorRole = Object.keys(data[index]['roles']).some(
                        inner => {
                            return data[index]['roles'][inner]['name'] === 'Editor'
                        }
                    )
                    newArray.push(hasEditorRole)
                })
                return newArray
            })
            setLoading(false);
            setUpload(true)
        });
        const list = await axiosClient.get("/admin/familylist");
        setList(list.data)
    };
    const onSubmit = (event) => {
        event.preventDefault()
        setLoading(true)
        if(!selected || selected.length < 1){
            toast.warning("The scopes can't be empty")
            setLoading(false)
            return
        }
        const formData = new FormData()
        formData.append('familylist', JSON.stringify(selected.map(item=>item.id)))
        formData.append('user_id', userid)
        formData.append('operation', operation)
        axiosClient.post("/admin/assigneditor", formData)
            .then(() => {
                setDisplay2(false)
                getResource()
            })
    };

    const onDelete = (id) => {
        if (!window.confirm("Are you sure to delete this user?")) return;
        const form = new FormData()
        form.append('id',id)
        axiosClient.post("/admin/removeuser",form).then(() => getResource());
    };


    const onDownload = () => {
        setLoading(true)
        axiosClient.get('/researcher/sample/export/' + id, {
            method: 'GET',
            responseType: 'blob',
        })
            .then((res) => {
                setLoading(false)
                fileDownload(res.data, 'dataset.xlsx')
            })
    }

    return (
        <>
            <SideNavbar />
            <div className="h-[50px] pl-[21%] pr-[1%] w-full flex flex-col pt-[16px]">
                <div className="flex items-center gap-4">
                    {/* <Link
                        to=""
                        className="h-[40px] flex flex-col justify-center items-center"
                    >
                        <img
                            className="h-full"
                            src="https://www.svgrepo.com/show/496822/back-square.svg"
                        ></img>
                    </Link> */}
                    <div className="flex flex-col">
                        <h1 className="text-[30px] font-cabin font-bold">
                            Manage Users
                        </h1>
                    </div>
                </div>
                <div className="w-full px-14 mt-6">
                    {loading && <Loading />}
                    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border-[2px] mb-6">
                        <thead class="text-xs uppercase bg-gray-700 text-gray-400">
                            <tr>
                                <th scope="col" class="px-6 py-3 w-1/5">
                                    No
                                </th>
                                <th scope="col" class="px-6 py-3 w-2/5">
                                    Username
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Role
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    <span class="sr-only">Operation</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {user && Object.keys(user).map((key, index) => (
                                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <th
                                        scope="row"
                                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                    >
                                        {index + 1}
                                    </th>
                                    <td class="px-6 py-4">{user[key]['email']}</td>
                                    <td class="px-6 py-4 flex-col">{Object.keys(user[key]['roles']).map(inner => (
                                        <p>&#x2022; {user[key]['roles'][inner]['name']}</p>
                                    ))}</td>
                                    <td class="px-6 py-4 text-right flex items-center justify-between">
                                        <div
                                            onClick={() => {
                                                if(toggle[index]){
                                                    setIsEditor(true)
                                                    setOperation('exist')
                                                }
                                                else{
                                                    setIsEditor(false)
                                                    setOperation('new')
                                                }
                                                setSelectedFam(user[key]['fishFamily'])
                                                setUserid(user[key]['id'])
                                                setDisplay2(true)
                                            }
                                            }
                                            class={`font-medium cursor-pointer hover:underline ${toggle[index] ? `text-blue-500` : `text-green-500`}`}
                                        >
                                            {toggle[index] ? ('Edit Properties') : ('Assign Editor')}
                                        </div>
                                        <div    
                                            onClick={() => onDelete(user[key]['id'])}
                                            class="font-medium text-red-600  hover:underline cursor-pointer"
                                        >
                                            Delete
                                        </div>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
            </div>
            <form onSubmit={onSubmit}>
                <PopupForm display={display2} setDisplay={setDisplay2} onSubmit={removeEditor} condition={isEditor ? 'Unassign Role': null}>
                    <h3 class="mb-3 text-2xl font-bold text-white">
                        Assign Scopes
                    </h3>

                    <div className="flex gap-1 w-full max-h-[300px] overflow-hidden">
                        <div className="basis-1/2 bg-slate-700 rounded-lg p-2 scrollbar-thin overflow-auto">
                            <p className="text-wite text-md font-bold mb-2">Selected family:</p>
                            <ul>
                                {selected && Object.keys(selected).map(key => (
                                    <li className="w-fit px-2 rounded-md cursor-pointer flex gap-4 bg-slate-600 mb-1">
                                        <span>{selected[key]['familyName']}</span>
                                        <span 
                                        className="font-bold hover:text-red-400"
                                        onClick={()=>{
                                            setSelectedFam(prevArray=>{
                                                const result = prevArray.filter((item)=>
                                                    item.id !== selected[key]['id']
                                                )
                                                return result
                                            })
                                        }}
                                        >x</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="grow bg-slate-700 rounded-lg p-2 scrollbar-thin overflow-hidden ">
                            <input
                                value={query}
                                type="search"
                                class="block w-[90%] mb-2 p-2 ps-2 text-xs text-gray-900 border border-gray-500 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search here"
                            />
                            <ul className="overflow-auto h-[200px] scrollbar-thin">
                                {filteredSearch && filteredSearch.map(item =>
                                    <li 
                                    className="w-fit px-2 font-roboto-bold-italic rounded-md cursor-pointer hover:bg-slate-600"
                                    onClick={()=>{
                                        setSelectedFam(prevArray=>{
                                            prevArray = Array.isArray(prevArray) ? [...prevArray, item] : [item]
                                            return prevArray
                                        })
                                    }}
                                    >
                                        {item.familyName}
                                    </li>
                                )}

                            </ul>
                        </div>
                    </div>
                </PopupForm>
            </form>
        </>
    );
}
