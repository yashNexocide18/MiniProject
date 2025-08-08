'use client'
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import LogNav from "./lognav";
import Link from "next/link";
import Image from "next/image";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import axios from "axios";

type User = {
    _id: string,
    username: string
}

export default function Navbar() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const getUsers = async () => {
            try {
                const usersid = localStorage.getItem("userid");
                if (!usersid) return;
                const res = await axios.get(`https://miniproject-6aoz.onrender.com/api/authentication/getuser/${usersid}`);
                setUser(res.data);
            } catch (err) {
                console.error("Failed to fetch user:", err);
            }
        };
        getUsers();
    }, []);

    const handleLogout = async () => {
        try {
            await axios.post("https://miniproject-6aoz.onrender.com/api/authentication/logout");
            localStorage.removeItem("token");
            localStorage.removeItem("userid");
            router.push("/login");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    const navItems = [
        { Label: "Home", href: "/home" },
        { Label: "Dashboard", href: "/dashboard" },
        { Label: "Blogs", href: "/blogs" },
    ];

    return (
        <nav className="w-[80vw] h-fit mx-auto pt-5 relative">
            <div className="flex items-center justify-between">
                <div>
                    <LogNav />
                </div>

                <div className="md:hidden flex justify-end">
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Image src="/menu.svg" alt="menu" width={25} height={25} />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-black text-white border border-blue-500">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {navItems.map(({ Label, href }, index) => (
                                <DropdownMenuItem key={index}>
                                    <Link href={href} className="hover:text-blue-500 transition-colors duration-300">
                                        {Label}
                                    </Link>
                                </DropdownMenuItem>
                            ))}
                            <DropdownMenuSeparator />
                            {user && (
                                <DropdownMenuItem onSelect={(e) => { e.preventDefault(); handleLogout(); }}>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <Image src="/logout.svg" alt="logout" height={23} width={23} />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Logout</p>
                                        </TooltipContent>
                                    </Tooltip>
                                    <span className="ml-2">Logout</span>
                                </DropdownMenuItem>
                            )}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                <div className="hidden md:flex">
                    <ul className="flex items-stretch gap-[50px]">
                        {navItems.map(({ Label, href }, index) => (
                            <li key={index} className="relative cursor-pointer group">
                                <Link href={href} className="hover:text-blue-500 transition-colors duration-300">
                                    {Label}
                                </Link>
                                <span className="absolute left-0 -bottom-1 h-[2px] w-full origin-left scale-x-0 bg-blue-500 transition-transform duration-300 group-hover:scale-x-100"></span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="hidden md:flex items-center justify-center gap-4">
                    {user && (
                        <div className="flex items-center gap-2">
                            <div className="h-8 w-8 border rounded-full"></div>
                            <h1>{user.username}</h1>
                            <Tooltip>
                                <TooltipTrigger onClick={handleLogout}>
                                    <Image src="/logout.svg" alt="logout" height={23} width={23} />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Logout</p>
                                </TooltipContent>
                            </Tooltip>
                        </div>
                    )}
                </div>
            </div>

            <div className="absolute h-[2px] bg-blue-500 bottom-[-20px] w-full"></div>
        </nav>
    );
}
