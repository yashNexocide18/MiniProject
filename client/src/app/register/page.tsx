"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import LogNav from "../components/lognav";
import axios from "axios";

export default function Register() {
    
    const router = useRouter();
    const [username, setuserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const validateEmail = (email: string) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };
    const validateName = (name: string) => {
        const regex = /^[A-Za-z].*$/;
        return regex.test(name);
    };
    
    const handlesignup = async () => {
        if (!username || !email || !password) {
            alert("Please fill in all fields.");
            return;
        }
    
        if (!validateEmail(email)) {
            alert("Please enter a valid email address.");
            return;
        }
        if (!validateName(username)) {
            alert("Please enter a valid username (ab10,yash18).");
            return;
        }
    
        if (password.length < 8) {
            alert("Password must be at least 8 characters long.");
            return;
        }
    
        try {
            const res = await axios.post("https://miniproject-6aoz.onrender.com/api/authentication/register", {
                username,
                email,
                password,
            });
            
    
            alert(res.data.message);
            router.push("/login");
        } catch (err) {
            console.error(err);
            alert("Registration failed. User may already exist.");
        }
    };
    return (
        <div className="min-h-screen flex flex-col">
            <div className="px-6 pt-6">
                <LogNav />
            </div>

            <div className="flex-grow flex items-center justify-center px-4">
                <div className="w-full max-w-md mx-auto p-4 rounded-[30px] shadow-lg md:shadow-[-12px_17px_10px_13px_#0a0a0a]  text-black border border-[#848181]">
                    <h2 className="text-3xl   font-bold text-center mb-8 text-white">
                        Sign Up
                    </h2>

                    <form className="space-y-7 ">
                        <div className="relative">
                            <Image
                                height={30}
                                width={30}
                                src="/person.svg"
                                alt="user"
                                className="absolute left-3 top-1/2 transform -translate-y-1/2"
                            />
                            <input
                                id="username"
                                type="text"
                                value={username}
                                onChange={(e) => setuserName(e.target.value)}
                                placeholder="Username"
                                required
                                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg bg-black text-gray-50 hover:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

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
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                required
                                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg bg-black text-gray-50 hover:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <button
                            type="button"
                            onClick={handlesignup}
                            className="w-full bg-[#202020] hover:bg-blue-600 text-white font-semibold py-3 rounded-xl transition"
                        >
                            Sign Up
                        </button>

                        <p className="text-center text-sm text-gray-400">
                            Already have an account?{" "}
                            <a href="/login" className="text-blue-600 hover:underline">
                                Sign In
                            </a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}
