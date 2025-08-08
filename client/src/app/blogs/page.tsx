import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Bloglist from "../components/bloglist";

export default function Dashboard(){
    return(
        <div className="min-h-screen flex flex-col">
            <Navbar/>
            <main className="flex-grow">
                <Bloglist/>
            </main>

            <Footer/>
            
        </div>
    );
}