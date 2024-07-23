import { Chart as ChartJS, defaults } from "chart.js/auto"
import { Bar, Doughnut, Line } from "react-chartjs-2"
import { useEffect, useState } from "react"
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';


defaults.responsive = true

export default function SummaryParts({ summary, setTitle, onChange, title, list, setDisplay, display }) {

    const [arrow2, setArrow2] = useState(false)
    const [arrow1, setArrow1] = useState(false)
    const [activeIndex1, setActiveIndex1] = useState(0)
    const [activeIndex2, setActiveIndex2] = useState(0)
    const [toggle1, setToggle1] = useState(false)
    const [translateY, setTranslateY] = useState(-100);
    const swiper = useSwiper();
    const { species, site, endangered, commercial, threatened, unknown } = summary



    const handle2 = () => {
        setArrow2(true)
    }
    const handle1 = () => {
        setArrow1(true)
    }
    const outhandle2 = () => {
        setArrow2(false)
    }
    const outhandle1 = () => {
        setArrow1(false)
    }

    const updateIndex1 = (newIndex1) => {
        if (newIndex1 < 0) {
            newIndex1 = 0;
        }
        console.log('size' + site.length)
        if (newIndex1 >= site.length)
            newIndex1 = site.length - 1
        //later add size of array
        setActiveIndex1(newIndex1)
    }
    const updateIndex2 = (newIndex2) => {
        if (newIndex2 < 0) {
            newIndex2 = 0;
        }
        //later add size of array
        setActiveIndex2(newIndex2)
    }


    return (
        <>
            <div className="grid grid-cols-3 grid-rows-3 gap-2 py-4">
                <div className="border flex flex-col justify-center items-center rounded-lg shadow">
                    <h3 className=" font-dmsans font-bold mb-4">Overall</h3>
                    <div className="flex w-[50%] justify-between">
                        <p>Fish Caught</p>
                        <p>{summary.total}</p>
                    </div>
                    <div className="flex w-[50%] justify-between">
                        <p>Fish Species</p>
                        <p>{summary.speciesTotal}</p>
                    </div>
                </div>
                {!display && summary && summary.total > 1 &&
                    <div className="border grid grid-cols-3 items-center rounded-lg shadow overflow-hidden">
                        <div onClick={() => {
                            setTitle('Marine Species')
                            onChange(summary.marine)
                        }} className="overflow-hidden h-full">
                            <div className="flex justify-center items-center h-full bg-blue-300 font-dmsans font-semibold text-white text-sm
                 bg-[url(https://imgs.search.brave.com/WpB0MmyHPAgqtmfQTSYDuCMm8_tYzSi1GF6Q3zdhPPk/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9ibHVlLXNlYS1v/Y2Vhbi13YXRlci1z/dXJmYWNlLXVuZGVy/d2F0ZXItd2l0aC1z/dW5ueS1jbG91ZHkt/c2t5c2Vhc2NhcGUt/c3VtbWVyLWJhY2tn/cm91bmQtd2FsbHBh/cGVyXzE5NjItMjgx/Ny5qcGc_c2l6ZT02/MjYmZXh0PWpwZw)]
                bg-cover hover:scale-125 transition-transform duration-300
                ">Marine</div>
                        </div>
                        <div onClick={() => {
                            setTitle('Estuarine Species')
                            onChange(summary.estuarine)
                        }} className="overflow-hidden h-full">
                            <div className="flex justify-center items-center h-full bg-blue-300 font-dmsans font-semibold text-white text-sm
                 bg-[url(https://imgs.search.brave.com/6OaNU5cbVriE4pv0CxsxS3BZKEfuITYZ38dpyLmNpaQ/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTI0/MjU4NzQ1OC9waG90/by9hZXJpYWwtcGhv/dG9ncmFwaC1vZi13/ZXRsYW5kLWVzdHVh/cnkuanBnP3M9NjEy/eDYxMiZ3PTAmaz0y/MCZjPU5uUkFqNUxo/NThXcXdNWHhiSU9T/alJrdlBLdlJxcURx/OWJWSThRc2tVNjg9)]
                  bg-cover hover:scale-125 transition-transform duration-300
                ">Estuarine</div>
                        </div>
                        <div onClick={() => {
                            setTitle('Freshwater Species')
                            onChange(summary.freshwater)
                        }} className="overflow-hidden h-full">
                            <div className="flex justify-center items-center h-full bg-blue-300 font-dmsans font-semibold text-white text-sm
                 bg-[url(https://st4.depositphotos.com/1006472/31002/i/450/depositphotos_310026934-stock-photo-background-of-lake-water-surface.jpg)]
                  bg-cover hover:scale-125 transition-transform duration-300
                ">Freshwater</div>
                        </div>
                    </div>
                }
                {display &&
                    <div className="scrollbar-thin overflow-auto bg-slate-300 rounded-lg p-2 max-h-[170px]">
                        <div className="flex justify-center items-center text-lg font-roboto-bold-italic"><p>{title}</p>&nbsp;<span onClick={() => setDisplay(false)} className="flex justify-center items-center rounded-full cursor-pointer bg-slate-200 h-[20px] w-[20px]">x</span></div>
                        {list.map(item =>
                            <div className="flex justify-between w-full px-4 text-sm"><span>{item.species}</span><span>{item.total}</span></div>
                        )}
                        {list.length < 1 &&
                            <div className="w-full mt-10 text-sm flex justify-center">No Records...</div>
                        }
                    </div>
                }

                {summary && summary.total < 1 &&
                    <div className="flex h-full bg-slate-200 w-full items-center p-2">
                        <div className="w-[35px]">
                            <img
                                className="h-full"
                                src="https://www.svgrepo.com/show/522168/locked.svg"
                            ></img>
                        </div>
                        <p className=" text-black text-md w-full text-center font-bold">You doesn't have any data yet</p>
                    </div>
                }
                <div className="border rounded-lg shadow flex flex-col items-center row-span-3 py-3 px-2 max-h-[425px] overflow-hidden">
                    {summary && summary.total > 1 &&
                        <>
                            <h1 className="font-bold font-dmsans mb-3">Discovered Species</h1>
                            <div className="w-[60%]">
                                {
                                    species && (
                                        <Doughnut
                                            data={{
                                                labels: species.map(obj => (obj.species)),
                                                datasets: [
                                                    {
                                                        label: "Total",
                                                        data: species.map(obj => (obj.total)),
                                                    }
                                                ]
                                            }}
                                            options={{
                                                plugins: {
                                                    legend: {
                                                        // align: 'start',
                                                        // position: 'bottom',
                                                        display: false
                                                    }

                                                }
                                            }}
                                        />
                                    )
                                }
                            </div>
                            <div className="grow w-full mt-6 scrollbar-thin overflow-auto ">
                                <ul className="flex flex-col px-1 max-h-[200px]">
                                    {species && species.map(key => (<li className="flex justify-between items-center text-sm"><span>&#x2022; {key.species}</span><span>{key.total}</span></li>))}
                                </ul>
                            </div>
                        </>
                    }

                    {summary && summary.total < 1 &&
                        <div className="flex flex-col h-full bg-slate-200 w-full justify-center items-center p-4">
                            <div className="w-[35px]">
                                <img
                                    className="h-full"
                                    src="https://www.svgrepo.com/show/522168/locked.svg"
                                ></img>
                            </div>
                            <p className=" text-black text-md w-[60%] text-center font-bold">You doesn't have any data yet</p>
                        </div>

                    }
                </div>
                <div className=" border row-span-2 rounded-lg shadow overflow-hidden relative min-h-[280px]"
                    onMouseEnter={handle1} onMouseLeave={outhandle1}
                >
                    {summary && summary.total > 1 &&
                        <Swiper
                            spaceBetween={50}
                            slidesPerView={1}
                            onSlideChange={() => console.log('slide change')}
                            onSwiper={(swiper) => console.log(swiper)}
                            className="w-full h-full"
                        >

                            {site &&
                                site.map(obj => (
                                    <SwiperSlide>
                                        <div className="flex flex-col items-center overflow-hidden p-4 h-full">
                                            <h1 className={`font-bold font-dmsans text-center mb-3`}>{obj.siteName}</h1>
                                            {!toggle1 &&
                                                <div className="w-[60%]">
                                                    <Doughnut
                                                        data={{
                                                            labels: Object.keys(obj.data).map(key => (obj.data[key].species)),
                                                            datasets: [
                                                                {
                                                                    label: "Total",
                                                                    data: Object.keys(obj.data).map(key => (obj.data[key].total)),
                                                                }
                                                            ]
                                                        }}
                                                        options={{
                                                            plugins: {
                                                                legend: {
                                                                    display: false
                                                                }
                                                            }
                                                        }}
                                                    />
                                                </div>
                                            }
                                            {toggle1 &&
                                                <div className="h-full w-full">
                                                    <ul className="flex flex-col scrollbar-thin overflow-auto my-4 px-1 max-h-[100px]">
                                                        {obj.data.map(key => (<li className="flex justify-between items-center text-sm"><span>&#x2022; {key.species}</span><span>{key.total}</span></li>))}
                                                    </ul>
                                                </div>
                                            }

                                            <button
                                                type="button"
                                                className="hover:scale-95 transition-all duration-60 text-black bg-white border shadow-lg font-medium rounded-lg text-sm px-4 py-2.5 mt-4"
                                                onClick={() => setToggle1(!toggle1)}
                                            >
                                                <i class="fa-regular fa-eye"></i>
                                                &nbsp; view
                                            </button>
                                        </div>
                                    </SwiperSlide>
                                ))}
                        </Swiper>
                    }

                    {summary && summary.total < 1 &&
                        <div className="flex flex-col h-full bg-slate-200 w-full justify-center items-center p-4">
                            <div className="w-[35px]">
                                <img
                                    className="h-full"
                                    src="https://www.svgrepo.com/show/522168/locked.svg"
                                ></img>
                            </div>
                            <p className=" text-black text-md w-[60%] text-center font-bold">You doesn't have any data yet</p>
                        </div>

                    }
                </div>
                <div className="relative border row-span-2 rounded-lg shadow flex flex-col py-2 px-2 overflow-hidden items-stretch max-h-[280px]"
                    onMouseEnter={handle2} onMouseLeave={outhandle2}
                >
                    {summary && summary.total > 1 &&
                        <Swiper
                            spaceBetween={50}
                            slidesPerView={1}
                            onSlideChange={() => console.log('slide change')}
                            onSwiper={(swiper) => console.log(swiper)}
                            className="w-full h-full"
                        >
                            <SwiperSlide>
                                <div className="flex flex-col items-center w-full overflow-hidden">
                                    <h1 className="font-bold font-dmsans">Unknown Condition</h1>
                                    <div className="h-full w-full scrollbar-thin overflow-auto my-2 pt-5">
                                        <ul className="flex flex-col scrollbar-thin overflow-auto px-1 max-h-[200px]">
                                            {unknown && unknown.map(key => (<li className="flex justify-between items-center text-sm"><span>&#x2022; {key.species}</span><span>{key.total}</span></li>))}
                                        </ul>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="flex flex-col items-center w-full overflow-hidden">
                                    <h1 className="font-bold font-dmsans">Endangered Species</h1>
                                    <div className="h-full w-full scrollbar-thin overflow-auto my-2 pt-5">
                                        <ul className="flex flex-col scrollbar-thin overflow-auto px-1 max-h-[200px]">
                                            {endangered && endangered.map(key => (<li className="flex justify-between items-center text-sm"><span>&#x2022; {key.species}</span><span>{key.total}</span></li>))}
                                            {endangered && endangered < 1 &&
                                                <div className="flex flex-col h-full w-full justify-center items-center p-4">
                                                    <div className="w-[35px]">
                                                        <img
                                                            className="h-full"
                                                            src="https://www.svgrepo.com/show/522168/locked.svg"
                                                        ></img>
                                                    </div>
                                                    <p className=" text-black text-md w-[60%] text-center font-bold">No Records</p>
                                                </div>
                                            }
                                        </ul>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="flex flex-col items-center w-full overflow-hidden">
                                    <h1 className="font-bold font-dmsans">Threatened Species</h1>
                                    <div className="h-full w-full scrollbar-thin overflow-auto my-2 pt-5">
                                        <ul className="flex flex-col scrollbar-thin overflow-auto px-1 max-h-[200px]">
                                            {threatened && threatened.map(key => (<li className="flex justify-between items-center text-sm"><span>&#x2022; {key.species}</span><span>{key.total}</span></li>))}
                                            {threatened && threatened < 1 &&
                                                <div className="flex flex-col h-full w-full justify-center items-center p-4">
                                                    <div className="w-[35px]">
                                                        <img
                                                            className="h-full"
                                                            src="https://www.svgrepo.com/show/522168/locked.svg"
                                                        ></img>
                                                    </div>
                                                    <p className=" text-black text-md w-[60%] text-center font-bold">No Records</p>
                                                </div>
                                            }
                                        </ul>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="flex flex-col items-center w-full overflow-hidden">
                                    <h1 className="font-bold font-dmsans">Commercial Species</h1>
                                    <div className="h-full w-full scrollbar-thin overflow-auto my-2 pt-5">
                                        <ul className="flex flex-col scrollbar-thin overflow-auto px-1 max-h-[200px]">
                                            {commercial && commercial.map(key => (<li className="flex justify-between items-center text-sm"><span>&#x2022; {key.species}</span><span>{key.total}</span></li>))}
                                            {commercial && commercial < 1 &&
                                                <div className="flex flex-col h-full w-full justify-center items-center p-4">
                                                    <div className="w-[35px]">
                                                        <img
                                                            className="h-full"
                                                            src="https://www.svgrepo.com/show/522168/locked.svg"
                                                        ></img>
                                                    </div>
                                                    <p className=" text-black text-md w-[60%] text-center font-bold">No Records</p>
                                                </div>
                                            }
                                        </ul>
                                    </div>
                                </div>
                            </SwiperSlide>

                        </Swiper>
                    }

                    {summary && summary.total < 1 &&
                        <div className="flex flex-col h-full bg-slate-200 w-full justify-center items-center p-4">
                            <div className="w-[35px]">
                                <img
                                    className="h-full"
                                    src="https://www.svgrepo.com/show/522168/locked.svg"
                                ></img>
                            </div>
                            <p className=" text-black text-md w-[60%] text-center font-bold">You doesn't have any data yet</p>
                        </div>
                    }
                </div>

            </div>
        </>
    )
}