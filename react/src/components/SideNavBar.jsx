import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import { toast } from "react-toastify";
import axiosClient from "./../../axios-client"
import { data } from "autoprefixer";


export default function SideNavbar() {

    const [toggleManageDataset, setToggleManageDataset] = useState(false)
    const [toggleAnalysis, setToggleAnalysis] = useState(false)
    const [toggleAdmin, setToggleAdmin] = useState(false)
    const { user, token, setToken, setUser } = useStateContext()
    const [first, setFirst] = useState(true)
    const [isEditor, setIsEditor] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [isResearcher, setIsResearcher] = useState(false)
    const [isContributor, setIsContributor] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        if (user && user.roles)
            user.roles.map(item => {
                if (item.name === 'Editor')
                    setIsEditor(true)
                else if (item.name === 'Researcher')
                    setIsResearcher(true)
                else if (item.name === 'Super_Admin')
                    setIsAdmin(true)
                else if (item.name === 'Contributor')
                    setIsContributor(true)
            })
        const script = document.createElement("script");
        script.src = "../../node_modules/flowbite/dist/flowbite.min.js";
        script.async = true;
        setFirst(false)
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, [token, user]);

    const onLogout = () => {
        axiosClient.get(`${!isAdmin ? '/user/logout' : '/admin/logout'}`).then(() => {
            setUser(null)
            navigate('/')
            setToken(null)
        });
    }
    return (
        <>
            <button
                data-drawer-target="sidebar-multi-level-sidebar"
                data-drawer-toggle="sidebar-multi-level-sidebar"
                aria-controls="sidebar-multi-level-sidebar"
                type="button"
                class="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            >
                <span class="sr-only">Open sidebar</span>
                <svg
                    class="w-6 h-6"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        clip-rule="evenodd"
                        fill-rule="evenodd"
                        d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                    ></path>
                </svg>
            </button>

            <aside
                id="sidebar-multi-level-sidebar"
                class="fixed top-0 left-0 z-40 w-[20%] h-screen transition-transform -translate-x-full sm:translate-x-0 border-[2px]"
                aria-label="Sidebar"
            >
                <div class="h-full px-3 py-4 overflow-y-auto bg-gray-100">
                    <div className="w-full text-center mb-5 py-5 ">
                        <p className="text-xl font-bold text-blue-500">FDDS</p>
                        {isAdmin && <p className="text-sm font-roboto-bold-italic">For Admin</p>}
                    </div>
                    <ul class="space-y-2 font-medium">
                        <li>
                            <Link
                                to="/"
                                class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                            >
                                <div className="h-[24px]">
                                    <img
                                        className="h-full"
                                        src="https://www.svgrepo.com/show/529026/home.svg"
                                    ></img>
                                </div>
                                <span class="ms-3">Home</span>
                            </Link>
                        </li>
                        {!isAdmin &&
                            <li>
                                <button
                                    type="button"
                                    class="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                    onClick={() => setToggleManageDataset(!toggleManageDataset)}
                                >
                                    <div className="h-[24px]">
                                        <img
                                            className="h-full"
                                            src="https://www.svgrepo.com/show/432184/folder-on.svg"
                                        ></img>
                                    </div>
                                    <span class="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                                        Dataset Manager
                                    </span>
                                    <svg
                                        class="w-3 h-3"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 10 6"
                                    >
                                        <path
                                            stroke="currentColor"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="m1 1 4 4 4-4"
                                        />
                                    </svg>
                                </button>
                                {toggleManageDataset &&
                                    (
                                        <ul
                                            class="py-2 space-y-2"
                                        >
                                            <li>
                                                <Link
                                                    to="/researcher/mydataset"
                                                    class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                                >
                                                    My Datasets
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    to="/researcher/sharedataset"
                                                    class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                                >
                                                    Dataset Sharing
                                                </Link>
                                            </li>
                                        </ul>
                                    )
                                }

                            </li>
                        }
                        {!isAdmin && !isContributor &&
                            <li>
                                <Link
                                    to="/researcher/repository"
                                    class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                                >
                                    <div className="h-[24px]">
                                        <img
                                            className="h-full"
                                            src="https://www.svgrepo.com/show/379584/repository.svg"
                                        ></img>
                                    </div>
                                    <span class="flex-1 ms-3 whitespace-nowrap">
                                        Dataset Repository
                                    </span>
                                </Link>
                            </li>
                        }
                        {!isAdmin &&
                            <li>
                                <button
                                    type="button"
                                    class="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                    onClick={() => setToggleAnalysis(!toggleAnalysis)}
                                >
                                    <div className="h-[24px]">
                                        <img
                                            className="h-full"
                                            src="https://www.svgrepo.com/show/415575/analysis-analytics-business.svg"
                                        ></img>
                                    </div>
                                    <span class="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                                        Analysis
                                    </span>
                                    <svg
                                        class="w-3 h-3"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 10 6"
                                    >
                                        <path
                                            stroke="currentColor"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="m1 1 4 4 4-4"
                                        />
                                    </svg>
                                </button>
                                {toggleAnalysis &&
                                    (
                                        <ul
                                            class="py-2 space-y-2"
                                        >
                                            <li>
                                                <Link
                                                    to="/researcher/summary"
                                                    class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                                >
                                                    Summary
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    to="/researcher/analysis"
                                                    class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                                >
                                                    Analysis Module
                                                </Link>
                                            </li>
                                        </ul>
                                    )
                                }

                            </li>
                        }
                        {isEditor &&
                            <li>
                                <Link
                                    to="/researcher/samplereview"
                                    class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                                >
                                    <div className="h-[24px]">
                                        <img
                                            className="h-full"
                                            src="https://www.svgrepo.com/show/511912/edit-text-bar-1373.svg"
                                        ></img>
                                    </div>
                                    <span class="flex-1 ms-3 whitespace-nowrap">
                                        Editor
                                    </span>
                                </Link>
                            </li>
                        }
                        {isAdmin &&
                            <li>
                                <button
                                    type="button"
                                    class="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                    onClick={() => setToggleAdmin(!toggleAdmin)}
                                >
                                    <div className="h-[24px]">
                                        <img
                                            className="h-full"
                                            src="https://www.svgrepo.com/show/501805/admin.svg"
                                        ></img>
                                    </div>
                                    <span class="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                                        Admin
                                    </span>
                                    <svg
                                        class="w-3 h-3"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 10 6"
                                    >
                                        <path
                                            stroke="currentColor"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="m1 1 4 4 4-4"
                                        />
                                    </svg>
                                </button>
                                {toggleAdmin &&
                                    (
                                        <ul
                                            class="py-2 space-y-2"
                                        >
                                            <li>
                                                <Link
                                                    to="/researcher/manageuser"
                                                    class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                                >
                                                    Manage User
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    to="/researcher/fishinfo"
                                                    class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                                >
                                                    Fish Information
                                                </Link>
                                            </li>
                                        </ul>
                                    )
                                }
                            </li>
                        }
                        <li>
                            <Link
                                to="/researcher/manageprofile"
                                class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                            >
                                <div className="h-[24px]">
                                    <img
                                        className="h-full"
                                        src="https://www.svgrepo.com/show/522440/profile.svg"
                                    ></img>
                                </div>
                                <span class="flex-1 ms-3 whitespace-nowrap">
                                    Manage Account
                                </span>
                            </Link>
                        </li>
                        <li>
                            <div
                                onClick={onLogout}
                                class="flex items-center cursor-pointer p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                            >
                                <div className="h-[24px]">
                                    <img
                                        className="h-full"
                                        src="https://www.svgrepo.com/show/520953/sign-out.svg"
                                    ></img>
                                </div>
                                <span class="flex-1 ms-3 whitespace-nowrap">
                                    Sign Out
                                </span>
                            </div>
                        </li>
                    </ul>
                </div>
            </aside>
        </>
    );
}
