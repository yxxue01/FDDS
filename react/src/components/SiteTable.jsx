import { Link } from "react-router-dom";

export default function SiteTable({ sites, onDelete, which, shared }) {
    return (
        <>
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border-[2px] mb-6">
                <thead class="text-xs uppercase bg-gray-700 text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3 w-1/5">
                            No
                        </th>
                        <th scope="col" class="px-6 py-3 w-3/5">
                            site
                        </th>
                        <th scope="col" class="px-6 py-3 w-1/5">
                            Status
                        </th>
                        <th scope="col" class="px-6 py-3 w-1/5">
                            <span class="sr-only">Operation</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {sites.map((site, index) => (
                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <th
                                scope="row"
                                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                                {index + 1}
                            </th>
                            <td class="px-6 py-4 underline"><Link to={`/researcher/${site.id}/${shared ? 'shared' + which : which}`}>{site.siteName}</Link></td>
                            {site.status === "completed" && (
                                <td class="px-6 py-4 text-green-400">{site.status}</td>
                            )}
                            {site.status !== "completed" && (
                                <td class="px-6 py-4 text-yellow-400">{site.status}</td>
                            )}
                            {!shared &&
                                <td class="px-6 py-4 text-right">
                                    <p
                                        onClick={() => { onDelete(site.id) }}
                                        class="font-medium text-red-600  hover:underline cursor-pointer"
                                    >
                                        Delete
                                    </p>
                                </td>
                            }
                        </tr>
                    ))}

                </tbody>
            </table>
        </>
    );
}
