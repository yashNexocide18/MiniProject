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
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";

type Blogs = {
    _id: string;
    title: string;
    content: string;
    author: {
        _id: string;
        username: string;
    };
    createdAt: string;
};

export default function DashList() {
    const [userBlogs, setUserBlogs] = useState<Blogs[]>([]);
    const [loading, setLoading] = useState(true);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const [editBlogId, setEditBlogId] = useState<string | null>(null);
    const [editTitle, setEditTitle] = useState("");
    const [editContent, setEditContent] = useState("");

    useEffect(() => {
        const getUsersBlog = async () => {
            setLoading(true);
            try {
                const usersid = localStorage.getItem("userid");
                const res = await axios.get(
                    `http://localhost:5000/api/blogs/getuserblogs/${usersid}`
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

    const handledelete = async (blogId: string) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.error("No token found");
                return;
            }

            await axios.delete(`http://localhost:5000/api/blogs/delete/${blogId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setUserBlogs(prev => prev.filter(blog => blog._id !== blogId));
        } catch (err) {
            console.error("Failed to delete blog:", err);
        }
    };

    const handlecreate = async () => {
        try {
            const token = localStorage.getItem("token");
            const userId = localStorage.getItem("userid");

            if (!token || !userId) {
                console.error("Missing token or user ID");
                return;
            }

            const res = await axios.post(
                "http://localhost:5000/api/blogs/create",
                {
                    title,
                    content,
                    author: userId,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setUserBlogs(prev => [...prev, res.data]);
            setTitle("");
            setContent("");
        } catch (err) {
            console.error("Failed to create blog:", err);
        }
    };

    const handleupdate = async (blogId: string) => {
        try {
            const token = localStorage.getItem("token");
            const userId = localStorage.getItem("userid");

            if (!token || !userId) {
                console.error("Missing token or user ID");
                return;
            }

            await axios.put(
                `http://localhost:5000/api/blogs/update/${blogId}`,
                {
                    title: editTitle,
                    content: editContent,
                    author: userId,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setUserBlogs((prev) =>
                prev.map((blog) =>
                    blog._id === blogId
                        ? { ...blog, title: editTitle, content: editContent }
                        : blog
                )
            );
            setEditTitle("");
            setEditContent("");
            setEditBlogId(null);
        } catch (err) {
            console.error("Failed to update blog:", err);
        }
    };

    return (
        <div className="w-[80vw] mx-auto bg-black h-[75vh] mt-10 rounded-3xl">
            <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 bg-black mt-10 rounded-3xl min-h-[75vh]">
                <div className="text-white text-xl sm:text-2xl font-bold text-center mb-4">
                    Your Blogs
                </div>
                <div className="bg-[#171717] rounded-2xl p-4 sm:p-6 overflow-x-auto">

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
                                    <TableRow key={blog._id}>
                                        <TableCell className="font-medium">{index + 1}</TableCell>
                                        <TableCell>{blog.title}</TableCell>
                                        <TableCell>
                                            {blog.content?.length > 40
                                                ? blog.content.slice(0, 40) + "..."
                                                : blog.content || "No content"}
                                        </TableCell>

                                        <TableCell>{blog.author?.username || "Unknown"}</TableCell>
                                        <TableCell>
                                            {new Date(blog.createdAt).toLocaleDateString() || "N/A"}
                                        </TableCell>
                                        <TableCell className="flex justify-center items-center gap-1">
                                            <Tooltip>
                                                <TooltipTrigger>
                                                    <Link href={`/dashboard/${blog._id}`}>
                                                        <Image src="/view.svg" alt="view" height={23} width={23} />
                                                    </Link>
                                                </TooltipTrigger>
                                                <TooltipContent>

                                                    View
                                                </TooltipContent>
                                            </Tooltip>

                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Image
                                                        src="/edit.svg"
                                                        alt="edit"
                                                        height={23}
                                                        width={23}
                                                        onClick={() => {
                                                            setEditBlogId(blog._id);
                                                            setEditTitle(blog.title);
                                                            setEditContent(blog.content);
                                                        }}
                                                    />
                                                </DialogTrigger>
                                                <DialogContent className="sm:max-w-[425px]">
                                                    <DialogHeader>
                                                        <DialogTitle>Edit a Blog</DialogTitle>
                                                        <DialogDescription>
                                                            Update your blog details below.
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <div className="grid gap-4">
                                                        <div className="grid gap-3">
                                                            <Label htmlFor="edit-title">Title</Label>
                                                            <Input
                                                                id="edit-title"
                                                                name="edit-title"
                                                                value={editTitle}
                                                                onChange={(e) => setEditTitle(e.target.value)}
                                                            />
                                                        </div>
                                                        <div className="grid gap-3">
                                                            <Label htmlFor="edit-content">Content</Label>
                                                            <Textarea className="h-[30vh]"
                                                                id="edit-content"
                                                                name="edit-content"
                                                                value={editContent}
                                                                onChange={(e) => setEditContent(e.target.value)}
                                                            />
                                                        </div>
                                                    </div>
                                                    <DialogFooter>
                                                        <DialogClose asChild>
                                                            <Button variant="outline">Cancel</Button>
                                                        </DialogClose>
                                                        <DialogClose asChild>
                                                            <Button
                                                                onClick={() => editBlogId && handleupdate(editBlogId)}
                                                                type="button"
                                                                className="bg-black hover:border-white hover:border-[1px]"
                                                            >
                                                                Update
                                                            </Button>
                                                        </DialogClose>
                                                    </DialogFooter>
                                                </DialogContent>
                                            </Dialog>

                                            <AlertDialog>
                                                <Tooltip>
                                                    <AlertDialogTrigger asChild>
                                                        <TooltipTrigger asChild>
                                                            <Image
                                                                src="/delete.svg"
                                                                alt="delete"
                                                                height={23}
                                                                width={23}
                                                                className="cursor-pointer"
                                                            />
                                                        </TooltipTrigger>
                                                    </AlertDialogTrigger>
                                                    <TooltipContent><p>Delete</p></TooltipContent>
                                                </Tooltip>

                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            This action cannot be undone. This will permanently delete your blog.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                        <AlertDialogAction onClick={() => handledelete(blog._id)} className="bg-white text-black hover:bg-[#bbb8b8]">
                                                            Continue
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}

                    <div className="flex justify-end items-center mt-4">
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="outline">+ Create Blog</Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle>Create a Blog</DialogTitle>
                                    <DialogDescription>
                                        Fill in the details below to publish your blog.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4">
                                    <div className="grid gap-3">
                                        <Label htmlFor="title">Title</Label>
                                        <Input
                                            id="title"
                                            name="title"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                        />
                                    </div>
                                    <div className="grid gap-3">
                                        <Label htmlFor="content">Content</Label>
                                        <Textarea className="h-[30vh]"
                                            id="content"
                                            name="content"
                                            placeholder="Write your blog content..."
                                            value={content}
                                            onChange={(e) => setContent(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button variant="outline">Cancel</Button>
                                    </DialogClose>
                                    <DialogClose asChild>
                                        <Button onClick={handlecreate} type="button" className="bg-black hover:border-white hover:border-[1px]">
                                            Create
                                        </Button>
                                    </DialogClose>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            </div>
        </div>
    );
}
