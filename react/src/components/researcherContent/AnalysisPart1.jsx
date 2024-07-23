export default function AnalysisPart1({ resource, setSelection, selection, handleSubmit }) {

    const handleChange = (e) => {
        if (e.target.checked) {
            setSelection([...selection, e.target.value]);
        } else {
            //only take true value
            setSelection(selection.filter((item) => item !== e.target.value));
        }
    }

    return (
        <>
            <div className=" flex justify-between px-14 gap-4 ">
                <h1 className=" text-title font-cabin font-bold">
                    Analysis Module
                </h1>
            </div>
            <div className="w-full px-14 mt-4">
                <div className="border shadow-md p-4 rounded-lg flex-col h-full">
                    {resource && resource.length != 0 &&
                        <>
                            <div className="flex items-center gap-3">
                                <div className="flex justify-center items-center bg-blue-400 rounded-full h-[40px] w-[40px]">1</div>
                                <h1 className=" text-subtitle font-dmsans">Pick Stations</h1>
                            </div>
                            {resource &&
                                Object.keys(resource).map(item => (
                                    <div className=" pt-6 pl-10">
                                        <h1 className=" font-dmsans font-bold">{item}</h1>
                                        <div className="flex flex-wrap gap-4 pt-2 w-[80%]">
                                            {
                                                Object.keys(resource[item]).map(item => (
                                                    <div class="flex items-center ">
                                                        <input onChange={handleChange} id="default-checkbox" type="checkbox" value={item} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                        <label for="default-checkbox" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{item}</label>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                )
                                )
                            }

                            <div className="flex justify-end items-end">
                                <button
                                    type="button"
                                    class="text-white bg-blue-700 hover:bg-blue-800 w-fit focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none"
                                    onClick={handleSubmit}
                                >
                                    Next
                                </button>
                            </div>
                        </>
                    }
                    {resource && resource.length<1 &&
                        <div className="flex h-full bg-slate-200 w-full justify-center items-center gap-2 p-4">
                            <div className="w-[35px]">
                                <img
                                    className="h-full"
                                    src="https://www.svgrepo.com/show/522168/locked.svg"
                                ></img>
                            </div>
                            <p className=" text-black text-md font-bold">You doesn't have any data yet</p>
                        </div>

                    }
                </div>
            </div>
        </>
    )
}