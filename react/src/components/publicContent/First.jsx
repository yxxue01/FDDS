import community from "../../assets/images/comunity.jpg";
import analysis from "../../assets/icons/analysis.svg";
import dataset from "../../assets/icons/dataset.svg";
import database from "../../assets/icons/database.svg";
import { Link } from "react-router-dom";

export default function First() {
    return (
        <>
            <div className="flex px-32 justify-between items-center">
                <div className="flex basis-[60%] flex-col gap-10">
                    <h1 className="font-cabin font-bold text-[40px] leading-none">
                        Fish Digital Dataset System (FDDS)
                    </h1>
                    <p className="font-dmsans text-[18px] font-medium">
                        <span className="font-bold text-xl">FDDS</span> is the premier biodiversity information website for all fishes in Malaysia.
                        <span className="font-bold text-xl"> FDDS</span> includes of information on all fish species currently known including their biology, ecology, and taxonomy.
                        <span className="font-bold text-xl"> FDDS</span> also includes analytical and graphical tools that allow users to transform raw data into information that can be used to assess abundance and diversity.
                        It is intended to facilitate analyses the diversity, abundance, and to support informed decisions about fisheries use and management.
                    </p>
                </div>
                <div className="basis-[50%]">
                    <img
                        src={community}
                        alt="community"
                        className="h-full w-full object-cover"
                    />
                </div>
            </div>
            <div className="flex flex-col items-start px-32 gap-4  mt-10">
                <h1 className="text-[30px] font-cabin font-bold">
                    The Participant Network
                </h1>
                <p className="font-dmsans text-[17px] font-medium w-[80%] mb-2">
                    Collaborative journey with researchers, contributors, students and experts as they join forces to contribute and open access to Fish Biodiversity Data of Malaysia. The list includes all participants, including organizations and communities.
                </p>
                <div className="flex gap-10">
                    <div className="flex gap-4 items-center">
                        <i class="fa-solid fa-book fa-2x"></i>
                        <p className="text-[17px] font-dmsans hover:text-cyan-500 duration-100">
                            Researcher
                        </p>
                    </div>
                    <div className="flex gap-4 items-center">
                        <i class="fa-solid fa-hand-holding-hand fa-2x"></i>
                        <p className="text-[17px] font-dmsans hover:text-cyan-500 duration-100">
                            Contributor
                        </p>
                    </div>
                    <div className="flex gap-4 items-center">
                        <i class="fa-solid fa-book-open fa-2x"></i>
                        <p className="text-[17px] font-dmsans hover:text-cyan-500 duration-100">
                            Students
                        </p>
                    </div>
                    <div className="flex gap-4 items-center">
                        <i class="fa-solid fa-user-tie fa-2x"></i>
                        <p className="text-[17px] font-dmsans hover:text-cyan-500 duration-100">
                            Experts
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex mt-[100px] px-32">
                <div className="border-[5px] border-blue-700 rounded-xl bg-blue-100 flex w-full px-10 py-8 gap-6 items-center">
                    <div className="flex flex-col items-start gap-[25px] basis-[40%]">
                        <h1 className="text-[32px] font-cabin font-bold">
                            Involved in fish research?
                        </h1>
                        <p className="font-dmsans font-medium">
                            There are bunch of reason why you should join the
                            community here.
                        </p>
                        <p className="font-dmsans font-bold">
                            You could utilize the system, contribute to others
                            and get the resources you ever need.
                        </p>
                        <Link to={'/register'} class="text-black font-sans font-bold bg-white border border-blue-500 hover:text-white hover:bg-blue-500 focus:ring-4 focus:ring-blue-300 rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none">Join Now</Link>
                    </div>
                    <div className="bg-black h-[200px] w-[3px] rounded"></div>
                    <div className="flex flex-col grow gap-4 items-center">
                        <h1 className="text-[32px] font-cabin font-bold">
                            Utilities
                        </h1>
                        <div className="flex justify-center w-full gap-6">
                            <div className="flex flex-col items-center">
                                <Link to="#" className="w-[70px]">
                                    <img
                                        src={database}
                                        alt="repo"
                                        className="h-full w-full object-cover"
                                    />
                                </Link>
                                <p className="font-cabin">Dataset Repository</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <Link to="#" className="w-[70px]">
                                    <img
                                        src={dataset}
                                        alt="repo"
                                        className="h-full w-full object-cover"
                                    />
                                </Link>
                                <p className="font-cabin">Dataset Manager</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <Link to="#" className="w-[70px]">
                                    <img
                                        src={analysis}
                                        alt="repo"
                                        className="h-full w-full object-cover"
                                    />
                                </Link>
                                <p className="font-cabin">Dataset Analysis</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}