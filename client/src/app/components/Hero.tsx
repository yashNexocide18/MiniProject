"use client"
import { useRouter } from "next/navigation";
export default function Hero() {
    const router = useRouter()
    const route = async () =>{
router.push("/dashboard");
    }
    return (
        <div className="w-[80vw] mx-auto">
            <div className="flex flex-col items-center justify-center py-20 px-6 min-h-[70vh] text-center">
                <h1 className="text-[2.5rem] sm:text-[4rem] bg-[linear-gradient(90deg,rgba(36,36,69,1)_0%,rgba(32,28,237,1)_39%,rgba(3,154,216,1)_71%,rgba(0,212,255,1)_100%)] bg-clip-text text-transparent font-bold mb-4 leading-tight">
                    Welcome to UrContent
                </h1>
                <p className="text-lg text-gray-200 max-w-xl mb-6">
                    Your one-stop solution for all your content needs.
                </p>
                <button onClick={route} className="bg-[#0000CD] hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300">
                    Get Started
                </button>
            </div>
        </div>
    );
}
