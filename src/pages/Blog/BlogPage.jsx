import React, { useEffect, useState } from "react";
import axiosClient from "../../utils/axiosClient";
import { Link } from "react-router-dom";
import Spinner from "../../components/Spinner";

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await axiosClient.get("/blog/get-all-blog");
      setBlogs(res.data.data);
    } catch (error) {
      console.log("Error loading blogs", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Page title */}
      <h1 className="text-4xl font-bold mb-8 text-gray-900">
        Latest Blog Posts
      </h1>

      {/* Blog Cards Grid */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <Link key={blog._id} to={`/blog/${blog._id}`}>
            <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer">
              {/* Image */}
              {blog.Image?.url && (
                <div className="overflow-hidden h-48">
                  <img
                    src={blog.Image.url}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    alt={blog.title}
                  />
                </div>
              )}

              {/* Card content */}
              <div className="p-5">
                <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-700 transition-colors">
                  {blog.title}
                </h3>

                <p className="text-sm text-gray-500 mt-2">By {blog.author}</p>

                {/* Tags Preview */}
                {blog.Tags && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {blog.Tags.split(",")
                      .slice(0, 2)
                      .map((tag, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-700"
                        >
                          #{tag.trim()}
                        </span>
                      ))}
                  </div>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
