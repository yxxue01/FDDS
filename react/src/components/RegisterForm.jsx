export default function RegisterForm({children}) {

    return (
        <section class="bg-slate-200 dark:bg-gray-900 pt-4 min-h-screen">
            <div class="flex flex-col items-center justify-center px-6 mx-auto  lg:py-0">
                <h1 className="text-center text-title font-cabin font-bold text-blue-700 my-2">Fish Digital Dataset</h1>
                <div class="w-full min-h-[250px] bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div class="p-6 space-y-4 md:space-y-6 sm:p-8 ">
                        {children}
                    </div>
                </div>
            </div>
        </section>
    )
}