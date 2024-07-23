import Navbar from "../../components/Navbar"
import First from  '../../components/publicContent/First'
import Footer from '../../components/footer'
export default function Welcome(){
    return(
        <>
            <Navbar/>
            <div id="content" className="mt-[120px] w-full mb-[100px] min-h-screen">
                <First/>
            </div>
            <Footer/>
        </>
    )
}