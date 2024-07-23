import { Link } from "react-router-dom";

export default function SampleTable({ samples, onDelete, shared }) {
    return (
        <>
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border-[2px] mb-6">
                <thead class="text-xs uppercase bg-gray-700 text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            No
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Species Name
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Family Name
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Sampling Id
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Collected Date
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Status
                        </th>
                        <th scope="col" class="px-6 py-3">
                            <span class="sr-only">Operation</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {samples.map((item, index) => (
                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <th
                                scope="row"
                                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                                {index + 1}
                            </th>
                            <td class="px-6 py-4">{item.info.speciesName}</td>
                            <td class="px-6 py-4">{item.info.fishinfo.familyName}</td>
                            <td class="px-6 py-4">{item.samplingid}</td>
                            <td class="px-6 py-4">{item.datecollected}</td>
                            {item.status === "accepted" && (
                                <td class="px-6 py-4 text-green-400">{item.status}</td>
                            )}
                            {item.status !== "accepted" && (
                                <td class="px-6 py-4 text-yellow-400">{item.status}</td>
                            )}
                            <td class="px-6 py-4 text-right flex items-center">
                                <Link
                                    to={`/researcher/${item.id}/${shared ? 'sharedsampledetails' : 'sampledetails'}`}
                                    class="font-medium text-blue-600  hover:underline"
                                >
                                    {shared ? 'View' : 'Edit'}
                                </Link>
                                &nbsp;
                                &nbsp;
                                {!shared &&
                                    <Link
                                        onClick={() => onDelete(item.id)}
                                        class="font-medium text-red-600  hover:underline"
                                    >
                                        Delete
                                    </Link>
                                }

                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </>
    );
}
