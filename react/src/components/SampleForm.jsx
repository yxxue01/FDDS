
export default function SampleForm({
    editMode,
    species,
    upload,
    image,
    saveImage,
    sample,
    info,
    register,
    onChange,
    toggleType
}) {
    return (
        <>
            <div className="grid grid-cols-2 gap-4 py-4">
                <div className="border-[2px] rounded-lg p-4  shadow-lg">
                    <h1 className="font-cabin text-2xl my-2 font-semibold">
                        Identification
                    </h1>
                    <div>
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Reference No.
                        </label>
                        <input
                            type="text"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            {...register("refno")}
                            defaultValue={sample.refno}
                            required
                            readOnly
                        />
                    </div>
                    <div>
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Sampling Id
                        </label>
                        <input
                            type="text"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            {...register("samplingid")}
                            defaultValue={sample.samplingid}
                            required
                            readOnly
                        />
                    </div>
                    <div>
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Identified By
                        </label>
                        <input
                            type="text"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            {...register("identifiedBy")}
                            defaultValue={sample.identifiedBy}
                            required
                            readOnly
                        />
                    </div>
                    <div>
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Identified Date
                        </label>
                        <input
                            type="date"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            {...register("identifiedDate")}
                            defaultValue={sample.identifiedDate}
                            required
                            readOnly
                        />
                    </div>
                </div>
                <div className="row-span-2 border-[2px] rounded-lg p-4 shadow-lg">
                    <h1 className="font-cabin text-2xl my-2 font-semibold">
                        Capture Information
                    </h1>
                    <div>
                        <div>
                            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Collector Name
                            </label>
                            <input
                                type="text"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                {...register("collectorname")}
                                defaultValue={sample.collectorname}
                                required
                                readOnly={!editMode}
                            />
                        </div>
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Collected Date and Time
                        </label>
                        <input
                            type="datetime-local"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            {...register("datecollected")}
                            defaultValue={sample.datecollected}
                            required
                            readOnly={!editMode}
                        />
                    </div>
                    <div>
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Collect Method
                        </label>
                        <input
                            type="text"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            {...register("collectmethod")}
                            defaultValue={sample.collectmethod}
                            required
                            readOnly={!editMode}
                        />
                    </div>
                    <div>
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Longitude
                        </label>
                        <input
                            type="text"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            {...register("longitude")}
                            defaultValue={sample.longitude}
                            required
                            readOnly={!editMode}
                        />
                    </div>
                    <div>
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Latitude
                        </label>
                        <input
                            type="text"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            {...register("latitude")}
                            defaultValue={sample.latitude}
                            required
                            readOnly={!editMode}
                        />
                    </div>
                    <div>
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Depth
                        </label>
                        <input
                            type="text"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            {...register("depth")}
                            defaultValue={sample.depth}
                            readOnly={!editMode}
                        />
                    </div>
                    <div>
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Weight
                        </label>
                        <input
                            type="text"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            {...register("weight")}
                            defaultValue={sample.weight}
                            readOnly={!editMode}
                        />
                    </div>
                    <div>
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Standard Length(mm)
                        </label>
                        <input
                            type="text"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            {...register("standardL")}
                            defaultValue={sample.standardL}
                            readOnly={!editMode}
                        />
                    </div>
                    <div>
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Fork Length(mm)
                        </label>
                        <input
                            type="text"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            {...register("forkL")}
                            defaultValue={sample.forkL}
                            readOnly={!editMode}
                        />
                    </div>
                    <div>
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Total Length(mm)
                        </label>
                        <input
                            type="text"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            {...register("totalL")}
                            defaultValue={sample.totalL}
                            readOnly={!editMode}
                        />
                    </div>
                </div>
                <div className="border-[2px]  rounded-lg p-4 shadow-lg">
                    <h1 className="font-cabin text-2xl my-2 font-semibold">
                        Taxonomy
                    </h1>
                    <label className="w-full flex justify-center items-center border border-hidden rounded-md overflow-hidden my-4 cursor-pointer">
                        {upload && (
                            <img
                                src={image}
                                alt="fish"
                                className="h-full w-full object-cover"
                            />
                        )}
                        {!upload && editMode && (
                            <span className="border-[4px] border-blue-300 rounded-lg p-5 border-dotted font-dmsans font-bold">
                                <i class="fa-regular fa-image"></i>
                                &nbsp; Add Image
                            </span>
                        )}
                        <input
                            className="hidden"
                            type="file"
                            id="image"
                            onChange={saveImage}
                            disabled={!editMode}
                            accept="image/png, image/jpeg, image/webp"
                        />
                    </label>
                    <div>
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Common Name
                        </label>
                        <input
                            type="text"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            {...register("commonname")}
                            defaultValue={sample.commonname}
                            readOnly={!editMode}
                        />
                    </div>
                    <div>
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Species
                        </label>
                        <input
                            type="text"
                            list="species"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            {...register("species_id")}
                            defaultValue={info.speciesName}
                            readOnly={!editMode}
                        />
                        <datalist id="species">
                            {species.map((item) => (
                                <option value={item.speciesName} />
                            ))}
                        </datalist>
                    </div>
                    <div className="my-2">
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Type
                        </label>
                        <div className="flex justify-evenly mb-2">
                            <div class="flex items-center"> 
                                <input onChange={(ev) => { onChange(ev.target.value) }} disabled={!editMode} checked={toggleType === "estuarine"} id="estuarine" type="radio" value="estuarine" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Estuarine</label>
                            </div>
                            <div class="flex items-center">
                                <input onChange={(ev) => { onChange(ev.target.value) }} disabled={!editMode} checked={toggleType === "freshwater"} id="freshwater" type="radio" value="freshwater" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Freshwater</label>
                            </div>
                            <div class="flex items-center">
                                <input onChange={(ev) => { onChange(ev.target.value) }} disabled={!editMode} checked={toggleType === "marine"} id="marine" type="radio" value="marine" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Marine</label>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </>
    );
}
