import { useGetBlogQuery } from "../redux/api/blogApiSlice";
import { useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { format } from "date-fns";
import { useParams, Link } from "react-router-dom";
import { FaUser, FaCalendar, FaFolder } from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext";
import { useState } from "react";
import CreateBlogModal from "./CreateBlogModal";

const BlogDetails = () => {
    const { id } = useParams();
    const { data: blog, isLoading, error } = useGetBlogQuery(id);
    const { userInfo } = useSelector((state) => state.auth);
    const { isDarkMode } = useTheme();
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    if (isLoading) return <Loader />;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white dark:from-gray-900 dark:to-black">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                <Link
                    to="/blogs"
                    className="mb-4 sm:mb-6 inline-flex items-center text-blue-500 dark:text-pink-500 hover:text-blue-600 dark:hover:text-pink-600 transition-colors duration-200"
                >
                    <span className="mr-2">←</span> Back to Blogs
                </Link>

                <article className="rounded-xl shadow-2xl p-4 sm:p-8 bg-white dark:bg-gray-800 transition-all duration-300 hover:scale-[1.01]">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 dark:from-pink-500 dark:via-purple-500 dark:to-indigo-500 bg-clip-text text-transparent leading-tight py-1">
                        {blog.title}
                    </h1>

                    <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-3 sm:gap-4 text-sm mb-6 sm:mb-8 text-gray-600 dark:text-gray-300">
                        <div className="flex items-center">
                            <FaUser className="mr-2 text-blue-500 dark:text-pink-500" />
                            <span className="text-sm">{blog.author?.username}</span>
                        </div>
                        <div className="flex items-center">
                            <FaCalendar className="mr-2 text-blue-500 dark:text-pink-500" />
                            <span className="text-sm">{format(new Date(blog.createdAt), 'MMMM dd, yyyy')}</span>
                        </div>
                        {blog.category && (
                            <div className="flex items-center">
                                <FaFolder className="mr-2 text-blue-500 dark:text-pink-500" />
                                <span className="text-sm px-3 py-1 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 dark:from-pink-500 dark:to-purple-500 text-white">
                                    {blog.category.name}
                                </span>
                            </div>
                        )}
                    </div>

                    <div className="prose dark:prose-invert max-w-none">
                        {blog.content.split('\n').map((paragraph, index) => (
                            <p key={index} className="mb-4 leading-relaxed text-sm sm:text-base text-gray-600 dark:text-gray-300">
                                {paragraph}
                            </p>
                        ))}
                    </div>
                </article>

                <div className="mt-8 sm:mt-12 text-center">
                    {userInfo ? (
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="w-full sm:w-auto inline-block px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-indigo-500 dark:from-pink-500 dark:to-purple-500 
                            text-white rounded-lg transform hover:scale-105 transition-all duration-300
                            hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] dark:hover:shadow-[0_0_20px_rgba(236,72,153,0.5)] font-semibold text-sm sm:text-base"
                        >
                            Create Your Own Blog
                        </button>
                    ) : (
                        <div className="space-y-4">
                            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300">
                                Want to share your thoughts? Join our community!
                            </p>
                            <Link
                                to="/register"
                                className="w-full sm:w-auto inline-block px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-indigo-500 dark:from-pink-500 dark:to-purple-500 
                                text-white rounded-lg transform hover:scale-105 transition-all duration-300
                                hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] dark:hover:shadow-[0_0_20px_rgba(236,72,153,0.5)] font-semibold text-sm sm:text-base"
                            >
                                Register to Start Blogging
                            </Link>
                        </div>
                    )}
                </div>
            </div>

            <CreateBlogModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
};

export default BlogDetails; 