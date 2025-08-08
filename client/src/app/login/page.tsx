"use client"
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import LogNav from "../components/lognav";
import axios, { AxiosError } from "axios";

export default function Login() {
    
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const validateEmail = (email: string) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handlelogin = async () => {
        if (!email || !password) {
            alert("Please fill in all fields.");
            return;
        }

        if (!validateEmail(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        try {
            const res = await axios.post("https://miniproject-6aoz.onrender.com/api/authentication/login", {
                email,
                password,
            });
            alert(res.data.message);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("userid", res.data.user.id);

            router.push("/home");
     } catch (err) {
          const error = err as AxiosError<{ message: string }>; 
    const backendMsg = error?.response?.data?.message;

    if (backendMsg === "User not found") {
        alert("User not registered. Please sign up first.");
    } else if (backendMsg === "Invalid credentials") {
        alert("Incorrect password. Please try again.");
    } else {
        alert("Login failed. Please try again.");
    }
    setEmail("");
    setPassword("");

    console.error(err);
}


    };
    return (
        <div className="min-h-screen bg-[#171717] flex flex-col">
            <div className="px-6 pt-6">
                <LogNav />
            </div>

            <div className="flex-grow flex items-center justify-center px-4">
                <div className="w-full max-w-md mx-auto p-4 sm:p-6 md:p-10 rounded-[30px] shadow-lg md:shadow-[-12px_17px_10px_13px_#0a0a0a]  text-black border border-[#848181] size-min">
                    <h2 className="text-3xl font-bold text-center mb-8 text-white">
                        Sign In
                    </h2>
                    <form className="space-y-7">
                        <div className="relative">
                            <Image
                                height={30}
                                width={30}
                                src="/mail.svg"
                                alt="mail"
                                className="absolute left-3 top-1/2 transform -translate-y-1/2"
                            />
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                                required
                                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg bg-black text-gray-50 hover:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div className="relative">
                            <Image
                                height={30}
                                width={30}
                                src="/pass.svg"
                                alt="password"
                                className="absolute left-3 top-1/2 transform -translate-y-1/2"
                            />
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                required
                                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg bg-black text-gray-50 hover:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <button
                            type="button"
                            onClick={handlelogin}
                            className="w-full bg-[#202020] hover:bg-blue-600 text-white font-semibold py-3 rounded-xl transition"
                        >
                            Sign In
                        </button>

                        <p className="text-center text-sm text-gray-400">
                            {`Don't have an account? `}
                            <a href="/register" className="text-blue-600 hover:underline">
                                Sign up
                            </a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}
