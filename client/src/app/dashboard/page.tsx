import Navbar from "../components/Navbar";
import DashList from "../components/dashlist";
import Footer from "../components/Footer";
export default function Dashboard(){
    return(
        <div className="min-h-screen flex flex-col">
            <Navbar/>
            <main className="flex-grow">
                <DashList/>
            </main>

            <Footer/>
            
        </div>
    );
}