export default function Loading() {
    return (
        <>
            <div className=" w-full h-full fixed top-0 left-0 bg-white opacity-95 z-50 flex justify-center items-center">
                <div className="rounded-full h-24 w-24 border-t-8 border-b-8 border-blue-500 animate-spin"></div>
            </div>
        </>
    );
}
