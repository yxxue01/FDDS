import { useEffect, useState } from "react";
import axiosClient from "../../../../axios-client";
import SideNavbar from "../../../components/SideNavBar";
import SummaryParts from "../../../components/SummaryParts";
import AnalysisPart2 from "../../../components/researcherContent/AnalysisPart2";
import AnalysisPart1 from "../../../components/researcherContent/AnalysisPart1";

export default function Analysis() {

    const [resource, setResource] = useState({})
    const [update, setUpdate] = useState(false)
    const [submit,setSubmit] = useState(false)
    const [selection, setSelection] = useState([])

    const [species, setSpecies] = useState([])

    useEffect(() => {
        if (!update)
            getResource()
    }, [resource]);

    const getResource = async () => {
        const { data } = await axiosClient.get("/analysis");
        setUpdate(true)
        setResource(data);
        console.log(data)
    };

    const handleSubmit = ()=>{
        Object.keys(resource).map(item=>{
            // setStation(station=>[...station, Object.keys(resource[item]).filter(key => selection.includes(key))])
            Object.keys(resource[item]).map(key=>{
                if(selection.includes(key))
                    Object.keys(resource[item][key]).map(specieskey=>{
                        setSpecies(species=>({...species,[specieskey]: species[specieskey]
                            ? species[specieskey] + resource[item][key][specieskey]
                            : resource[item][key][specieskey]}))
                    })
            })
        })
        setSubmit(true)
    }


    return (
        <>
            <SideNavbar />
            <div className=" pl-[22%] pr-[1%] w-full flex flex-col pt-[16px] pb-3">
                {!submit && 
                    <AnalysisPart1 resource={resource} selection={selection} setSelection={setSelection} handleSubmit={handleSubmit}/>
                }
                {submit && 
                    <AnalysisPart2 selection={selection} species={species}/>
                }
            </div>
        </>
    );
}
