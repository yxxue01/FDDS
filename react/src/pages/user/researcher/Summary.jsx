import { useEffect, useState } from "react";
import axiosClient from "../../../../axios-client";
import SideNavbar from "../../../components/SideNavBar";
import SummaryParts from "../../../components/SummaryParts";
import Popup from "../../../components/Popup";

export default function Summary() {

    const [summary, setSummary] = useState({})
    const [update, setUpdate] = useState(false)
    const [display, setDisplay] = useState(false)
    const [title, setTitle] = useState()
    const [list, setList] = useState()

    useEffect(() => {
        if (!update)
            getResource()
        console.log(summary)
    }, [summary]);

    const getResource = async () => {
        const { data } = await axiosClient.get("/researcher/summary");
        analysis(data.data);
    };

    const onChange = (data)=>{
        setList(data)
        setDisplay(true)
    }

    const analysis = (data) => {
        let freshwater = []
        let marine = []
        let estuarine = []
        let endangered = []
        let threatened = []
        let commercial = []
        let unknown = []
        let speciesName = []
        let count = 0
        let sites = []
        Object.keys(data).map((index) => {
            count += Object.keys(data[index]['data']).length
            let hold = []
            Object.keys(data[index]['data']).map((innerIndex) => {
                speciesName.push(data[index]['data'][innerIndex]['speciesName'])
                hold.push(data[index]['data'][innerIndex]['speciesName'])
                const type = data[index]['data'][innerIndex]['type'].toLowerCase()
                if (type === "freshwater")
                    freshwater.push(data[index]['data'][innerIndex]['speciesName'])
                else if (type === "marine")
                    marine.push(data[index]['data'][innerIndex]['speciesName'])
                else if (type === "estuarine")
                    estuarine.push(data[index]['data'][innerIndex]['speciesName'])
                const condition = data[index]['data'][innerIndex]['condition'].toLowerCase()
                if (condition === "endangered")
                    endangered.push(data[index]['data'][innerIndex]['speciesName'])
                else if (condition === "threatened")
                    threatened.push(data[index]['data'][innerIndex]['speciesName'])
                else if (condition === "commercial")
                    commercial.push(data[index]['data'][innerIndex]['speciesName'])
                else if (condition === "unknown")
                    unknown.push(data[index]['data'][innerIndex]['speciesName'])
            })
            sites[data[index]['siteName']] = hold
        })
        // what reduce does
        // acc = accumulated object over iterate, next = current index
        // acc[next] will return current value of it, if doesnt exist, 0 will be chosen instead
        // acc[next] will be created if it doesnt exist
        let siteData = []

        Object.keys(sites).map(site => {
            const reduced = sites[site].reduce((acc, next) => {
                acc[next] = (acc[next] || 0) + 1
                return acc
            }, {})
            siteData[site] = reduced
        })

        const site = Object.keys(siteData).map(siteName => (
            {
                siteName: siteName,
                data: Object.keys(siteData[siteName]).map(keys => ({
                    species: keys,
                    total: siteData[siteName][keys]
                }))
            }
        ))
        const speciesResult = speciesName.reduce((acc, next) => {
            acc[next] = (acc[next] || 0) + 1
            return acc
        }, {})
        //first ver, which use explicit way to return obj
        const species = Object.keys(speciesResult).map(key => ({
            species: key,
            total: speciesResult[key]
        }))

        const freshResult = freshwater.reduce((acc, next) => {
            acc[next] = (acc[next] || 0) + 1
            return acc
        }, {})
        const marResult = marine.reduce((acc, next) => {
            acc[next] = (acc[next] || 0) + 1
            return acc
        }, {})
        const estResult = estuarine.reduce((acc, next) => {
            acc[next] = (acc[next] || 0) + 1
            return acc
        }, {})

        const endResult = endangered.reduce((acc, next) => {
            acc[next] = (acc[next] || 0) + 1
            return acc
        }, {})
        const thResult = threatened.reduce((acc, next) => {
            acc[next] = (acc[next] || 0) + 1
            return acc
        }, {})
        const comResult = commercial.reduce((acc, next) => {
            acc[next] = (acc[next] || 0) + 1
            return acc
        }, {})
        const ukResult = unknown.reduce((acc, next) => {
            acc[next] = (acc[next] || 0) + 1
            return acc
        }, {})

        //second ver where implicitly return obj without use return keyword just use () clause instead
        //key here represent like index, so when invoke result[key], it return particular value for that index

        freshwater = Object.keys(freshResult).map(key => ({
            species: key,
            total: freshResult[key],
        }))
        marine = Object.keys(marResult).map(key => ({
            species: key,
            total: marResult[key],
        }))
        estuarine = Object.keys(estResult).map(key => ({
            species: key,
            total: estResult[key],
        }))

        endangered = Object.keys(endResult).map(key => ({
            species: key,
            total: endResult[key],
        }))
        threatened = Object.keys(thResult).map(key => ({
            species: key,
            total: thResult[key],
        }))
        commercial = Object.keys(comResult).map(key => ({
            species: key,
            total: comResult[key],
        }))
        unknown = Object.keys(ukResult).map(key => ({
            species: key,
            total: ukResult[key],
        }))
        setUpdate(true)
        setSummary({
            total: count,
            freshwater: freshwater,
            marine: marine,
            estuarine: estuarine,
            commercial: commercial,
            endangered: endangered,
            threatened: threatened,
            unknown: unknown,
            speciesTotal: Object.keys(speciesResult).length,
            species: species,
            site: site
        })

    }

    return (
        <>
            <SideNavbar />
            <div className="h-[50px] pl-[22%] pr-[1%] w-full flex flex-col pt-[16px]">
                <div className=" flex justify-between px-14 gap-4 ">
                    <h1 className="text-[30px] font-cabin font-bold">
                        Summary
                    </h1>
                    {/* <button
                        type="button"
                        class="text-white bg-blue-700 font-medium rounded-lg text-sm px-4 py-2.5"
                        onClick={() => window.location.reload()}
                    >
                        <i class="fa-solid fa-download"></i>
                        &nbsp; Get Summary
                    </button> */}
                </div>
                <div className="w-full px-14 mt-1">
                    <SummaryParts summary={summary} display={display} onChange={onChange} setTitle={setTitle} title={title} list={list} setDisplay={setDisplay}/>
                </div>
            </div>
            {/* <Popup display={display} setDisplay={setDisplay}>
                <h3 class="mb-3 text-2xl font-bold text-white">
                    {title}
                </h3>
                <div>
                    {list &&
                        list.map(item=>
                            <div className="flex justify-between">
                                <p>{item.species}</p>
                                <p>{item.total}</p>
                            </div>
                        )
                    }
                </div>
            </Popup> */}
        </>
    );
}
