import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Hero from "../components/Hero";

export default function Home() {
    return (
        <div className="min-h-screen flex flex-col  text-white">
            <Navbar />
            
            <main className="flex-grow">
                <Hero />
            </main>

            <Footer />
        </div>
    );
}
