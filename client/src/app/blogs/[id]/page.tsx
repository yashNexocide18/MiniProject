"use client";

import { use, useEffect, useState } from "react";
import axios from "axios";

type Blogs = {
  id: string;
  title: string;
  content: string;
  author: {
    _id: string;
    username: string;
  };
  createdAt: string;
};

export default function BlogDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [blog, setBlog] = useState<Blogs | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/blogs/getblog/${id}`);
        setBlog(res.data);
      } catch (err) {
        console.error("Failed to fetch blog:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return <div className="p-10 w-[80vw] mx-auto text-xl">Loading...</div>;
  }

  if (!blog) {
    return <div className="p-10 w-[80vw] mx-auto text-red-500">Blog not found.</div>;
  }

  return (
    <div className="p-10 w-[80vw] mx-auto">
      <button
        onClick={() => window.history.back()}
        className="px-4 py-2 mb-4 rounded-full bg-black text-white hover:bg-[#252222] transition-colors duration-300"
      >
        X
      </button>
      <h1 className="text-4xl text-center font-bold mb-4">{blog.title} </h1>
      <p className="text-lg text-white whitespace-pre-wrap">{blog.content}</p>
    </div>
  );
}
