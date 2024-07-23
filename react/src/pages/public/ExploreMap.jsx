import Navbar from "../../components/Navbar"
import Third from  '../../components/publicContent/Third'
import Footer from '../../components/footer'
export default function Welcome(){
    return(
        <>
            <Navbar/>
            <div id="content" className="mt-[120px] w-full mb-[100px] min-h-screen">
                <Third/>
            </div>
            <Footer/>
        </>
    )
}