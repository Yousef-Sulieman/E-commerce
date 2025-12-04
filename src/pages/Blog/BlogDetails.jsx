import React, { useEffect, useState } from "react";
import axiosClient from "../../utils/axiosClient";
import { useParams } from "react-router-dom";
import Spinner from "../../components/Spinner";

export default function BlogDetails() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBlog();
  }, []);

  const getBlog = async () => {
    try {
      const res = await axiosClient.get(`/blog/${id}`);
      setBlog(res.data.data);
    } catch (error) {
      console.log("Error fetching blog", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Spinner />;

  if (!blog)
    return (
      <p className="p-6 text-center text-red-600 font-semibold">
        Blog not found
      </p>
    );

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Image Section */}
      {blog.Image?.url && (
        <div className="w-full rounded-2xl overflow-hidden shadow-lg">
          <img
            src={blog.Image.url}
            alt={blog.title}
            className="w-full h-72 md:h-96 object-cover"
          />
        </div>
      )}

      {/* Title */}
      <h1 className="text-4xl font-bold mt-8 leading-tight text-gray-900">
        {blog.title}
      </h1>

      {/* Author */}
      <div className="mt-3 flex items-center gap-3 text-sm text-gray-600">
        <span className="font-medium">By {blog.author}</span>
        <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
        <span>{blog.createdAt?.substring(0, 10)}</span>
      </div>

      {/* Content */}
      <div className="prose prose-lg prose-slate mt-8 max-w-none leading-8">
        {blog.content}
      </div>

      {/* Tags */}
      {blog.Tags && (
        <div className="mt-10 flex flex-wrap gap-2">
          {blog.Tags.split(",").map((tag, i) => (
            <span
              key={i}
              className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-full font-medium"
            >
              #{tag.trim()}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
