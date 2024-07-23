import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axiosClient from "../../../axios-client"
import fileDownload from "js-file-download"

export default function AnalysisPart2({ selection, species }) {

    const [hindex, setHindex] = useState()
    const [dindex, setDindex] = useState()
    const [jindex, setJindex] = useState()
    const navigate = useNavigate()

    let totalspecies = 0

    useEffect(() => {
        Object.keys(species).map(key => {
            totalspecies += species[key]
        })
        calhindex()
        caldindex()
        caljindex()
    })

    const download = async () => {

        const form = new FormData()

        const speciesList = Object.keys(species).map(data => ({
            speciesName: data,
            count: species[data]
        }))
        const index = [
            {
                index: "H' Index",
                count: hindex
            },
            {
                index: "D' Simpson Index",
                count: jindex
            },
            {
                index: "J' Pielo Evennes Index",
                count: dindex
            },
        ]
        const stations = selection.map(data => ({
            station: data
        }
        ))
        form.append('speciesList', JSON.stringify(speciesList))
        form.append('index', JSON.stringify(index))
        form.append('stations', JSON.stringify(stations))

        const {data} = await axiosClient.post('/analysis/download', form,{
            method: 'POST',
            responseType: 'blob'
        })
        fileDownload(data, 'AnalysisResult.xlsx')

    }


    const calhindex = () => {
        let heach = []
        Object.keys(species).map(key => {
            let pi = species[key] / totalspecies
            heach.push(pi * Math.log(pi))
        })
        let value = heach.reduce((acc, next) => (acc + next), 0)
        setHindex((value * -1).toFixed(2))
    }
    const caldindex = () => {
        let deach = []
        Object.keys(species).map(key => {
            let i = species[key] * (species[key] - 1)
            deach.push(i)
        })
        let value = deach.reduce((acc, next) => (acc + next), 0)
        setDindex((value / (totalspecies * (totalspecies - 1))).toFixed(2))
    }
    const caljindex = () => {
        let total = Object.keys(species).length
        setJindex((hindex / Math.log(total)).toFixed(2))
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
                    <div className="flex justify-between items-start">
                        <div className=" basis-[40%] p-4 bg-blue-200 border-[2px] border-blue-300 rounded-lg">
                            <h1 className="text-center mb-4">Summary</h1>
                            <div className="flex justify-between">
                                <h2>H' Index</h2>
                                <h2>{hindex}</h2>
                            </div>
                            <div className="flex justify-between">
                                <h2>D' Simpson Index</h2>
                                <h2>{dindex}</h2>
                            </div>
                            <div className="flex justify-between">
                                <h2>J' Pielo Evennes Index</h2>
                                <h2>{jindex}</h2>
                            </div>
                        </div>
                        <div className=" flex-grow p-4 max-w-[70%]">
                            <h1 className="text-center mb-4">Station</h1>
                            <div className="flex justify-center items-start gap-2 flex-wrap">
                                {species &&
                                    selection.map(key => (
                                        <div className=" bg-blue-100 p-2 rounded-md flex justify-center items-center">{key}</div>
                                    ))}
                            </div>
                        </div>
                    </div>
                    <div className="flex-col items-end mt-6">
                        <h1 className="w-full text-center mb-4">Analysis Data</h1>
                        <div className="flex justify-center">
                            <table class="w-[90%] text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border-[2px]">
                                <thead class="text-xs uppercase bg-gray-700 text-gray-400">
                                    <tr>
                                        <th scope="col" class="px-6 py-3 w-2/3">
                                            Speices
                                        </th>
                                        <th scope="col" class="px-6 py-3 w-1/3">
                                            Total
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.keys(species).map((data) => (
                                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                            <td class="px-6 py-4 underline">{data}</td>
                                            <td class="px-6 py-4 text-right">{species[data]}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {/* <div>
                        <h1 className="w-full text-center">Work Steps</h1>
                        <div>
                                <div>
                                    <h1>H' Index</h1>
                                    <h3>Formula: </h3>
                                </div>
                        </div>
                    </div> */}
                    <div className="flex justify-end items-end p-4 mt-4">
                        <Link
                            to="/researcher/summary"
                            class="text-blue-700 bg-white  w-fit border border-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none"
                        >
                            Back
                        </Link>
                        <button
                            type="button"
                            onClick={download}
                            class="text-white bg-blue-700 hover:bg-blue-800 w-fit focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none"
                        >
                            Download Result
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}