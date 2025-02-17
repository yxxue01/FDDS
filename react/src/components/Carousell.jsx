import { useState } from "react"
import { ChevronLeft, ChevronRight } from "react-feather"

export default function Carousell({ slides }) {

    const [curr, setCurr] = useState(0)
    const prev = () => setCurr(curr => curr === 0 ? slides.length - 1 : curr - 1)
    const next = () => setCurr(curr => curr === slides.length - 1 ? 0 : curr + 1)

    return <>
    </>
}