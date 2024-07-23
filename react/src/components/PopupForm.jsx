export default function PopupForm({
    children,
    display,
    setDisplay,
    onSubmit,
    condition
}) {
    return display ? (
        <div className="bg-transparent w-full h-full fixed top-0 left-0 flex justify-center items-center">
            <div
                tabindex="-1"
                class="overflow-y-auto overflow-x-hidden z-50 w-[40%] md:inset-0"
            >
                <div class="relative p-4 w-full max-w-lg h-full md:h-auto">
                    <div class="relative p-4  rounded-lg shadow bg-gray-800 md:p-8">
                        <div class="mb-4 text-sm font-light text-gray-400">
                            {children}
                        </div>
                        <div class="justify-end items-center pt-0 space-y-4 flex sm:space-y-0">
                            <div class="items-center space-y-4 sm:space-x-4 sm:flex sm:space-y-0">
                                <button
                                    onClick={() => setDisplay(false)}
                                    type="button"
                                    class="py-2 px-4 w-full text-sm font-medium bg-gray-700  rounded-lg border  sm:w-auto focus:ring-4 focus:outline-none focus:ring-primary-300  focus:z-10g-gray-700 text-gray-300 border-gray-500 hover:text-white hover:bg-gray-600 "
                                >
                                    Cancel
                                </button>
                                {condition &&
                                    <button
                                        onClick={() =>{
                                            onSubmit()
                                            setDisplay(false)
                                        }}
                                        type="button"
                                        class="py-2 px-4 w-full text-sm font-medium bg-orange-400  rounded-lg border  sm:w-auto focus:ring-4 focus:outline-none focus:ring-primary-300  focus:z-10g-gray-700 text-gray-300 border-gray-500 "
                                    >
                                        {condition}
                                    </button>
                                }
                                <button
                                    type="submit"
                                    class="py-2 px-4 w-full text-sm font-medium text-center text-white rounded-lg  sm:w-auto focus:ring-4 focus:outline-none focus:ring-primary-300 bg-primary-600 hover:bg-blue-900 "
                                >
                                    Confirm
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) : (
        ""
    );
}
