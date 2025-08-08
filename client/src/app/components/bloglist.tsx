'use client'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

type Blogs = {
    _id:string;
    title: string;
    content: string;
    author: {
        _id: string;
        username: string;
    };
    createdAt: string;
};

export default function Bloglist() {
    const [userBlogs, setUserBlogs] = useState<Blogs[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getUsersBlog = async () => {
            setLoading(true)
            try {
                const res = await axios.get(
                    `https://miniproject-6aoz.onrender.com/api/blogs/getblogs`
                );
                setUserBlogs(res.data);
            } catch (err) {
                console.error("Failed to fetch blogs:", err);
            } finally {
                setLoading(false);
            }
        };
        getUsersBlog();
    }, []);

    return (
        <div className="w-[80vw] mx-auto bg-black h-[75vh] mt-10 rounded-3xl">
            <div>
                <div className="text-white text-2xl font-bold p-5 text-center">
                    Blogs
                </div>
                <div className="p-5 bg-[#171717] w-[75vw] mx-auto rounded-3xl overflow-auto">
                    {loading ? (
                        <p className="text-white text-center">Loading...</p>
                    ) : userBlogs.length === 0 ? (
                        <p className="text-white text-center">No blogs found.</p>
                    ) : (
                        <Table>
                            <TableCaption>A list of blogs.</TableCaption>
                            <TableHeader className="bg-black">
                                <TableRow>
                                    <TableHead>ID</TableHead>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead>Author</TableHead>
                                    <TableHead>CreatedAt</TableHead>
                                    <TableHead className="text-center">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {userBlogs.map((blog, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="font-medium">{index + 1}</TableCell>
                                        <TableCell>{blog.title}</TableCell>
                                        <TableCell>{blog.content.length > 1 ? blog.content.slice(0, 40) + "..." : blog.content}</TableCell>
                                        <TableCell>{blog.author.username}</TableCell>
                                        <TableCell>
                                            {new Date(blog.createdAt).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell className="flex justify-center items-center gap-1">
                                            <Tooltip>
                                                <TooltipTrigger>
                                                    <Link href={`/dashboard/${blog._id}`}>
                                                        <Image src="/view.svg" alt="view" height={23} width={23} />
                                                    </Link>
                                                </TooltipTrigger>
                                                <TooltipContent><p>View</p></TooltipContent>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                    
                </div>
            </div>
        </div>
    );
}
