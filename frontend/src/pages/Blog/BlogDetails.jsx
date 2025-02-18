import { useGetBlogQuery, useToggleBlogLikeMutation } from "../redux/api/blogApiSlice";
import { useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { format } from "date-fns";
import { useParams, Link } from "react-router-dom";
import { FaUser, FaCalendar, FaFolder, FaRegArrowAltCircleLeft, FaHeart, FaRegHeart } from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext";
import { useState } from "react";
import CreateBlogModal from "./CreateBlogModal";
import { toast } from "react-toastify";

const BlogDetails = () => {
    const { id } = useParams();
    const { data: blog, isLoading, error } = useGetBlogQuery(id);
    const { userInfo } = useSelector((state) => state.auth);
    const { isDarkMode } = useTheme();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [toggleLike] = useToggleBlogLikeMutation();
    
    if (isLoading) return <Loader />;
    if (error) return <div>Error: {error.message}</div>;

    const handleLikeClick = async () => {
        if (!userInfo) {
            toast.error("Please login to like this blog");
            return;
        }

        try {
            await toggleLike(id).unwrap();
        } catch (err) {
            toast.error(err?.data?.message || "Failed to update like");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white dark:from-gray-900 dark:to-black">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                <Link
                    to="/blogs"
                    className="group mb-6 sm:mb-8 inline-flex items-center text-blue-600 dark:text-pink-400 hover:text-blue-700 dark:hover:text-pink-300 transition-all duration-300"
                >
                    <FaRegArrowAltCircleLeft className="mr-2 transition-transform duration-300 group-hover:-translate-x-1" />
                    <span className="font-medium">All Blog Posts</span>
                </Link>

                <article className="relative rounded-2xl shadow-xl dark:shadow-gray-800/30 p-6 sm:p-10 bg-white dark:bg-gray-800 transition-all duration-500 hover:shadow-2xl hover:dark:shadow-gray-800/50">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-700 opacity-30 -z-10" />
                    
                    <h1 className="text-4xl sm:text-5xl font-extrabold mb-8 pb-2 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 dark:from-pink-400 dark:via-purple-400 dark:to-indigo-400 bg-clip-text text-transparent leading-[1.3] sm:leading-[1.2] break-words whitespace-pre-wrap">
                        {blog.title}
                    </h1>

                    <div className="flex flex-wrap gap-4 mb-8">
                        <div className="flex items-center bg-blue-50 dark:bg-gray-700 px-4 py-2 rounded-full transition-all duration-300 hover:scale-105">
                            <FaUser className="mr-2 text-blue-500 dark:text-pink-400" />
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                                {blog.author?.username}
                            </span>
                        </div>
                        <div className="flex items-center bg-blue-50 dark:bg-gray-700 px-4 py-2 rounded-full transition-all duration-300 hover:scale-105">
                            <FaCalendar className="mr-2 text-blue-500 dark:text-pink-400" />
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                                {format(new Date(blog.createdAt), 'MMMM dd, yyyy')}
                            </span>
                        </div>
                        {blog.category && (
                            <div className="flex items-center bg-gradient-to-r from-blue-500 to-indigo-500 dark:from-pink-500 dark:to-purple-500 px-4 py-2 rounded-full transition-all duration-300 hover:scale-105">
                                <FaFolder className="mr-2 text-white" />
                                <span className="text-sm font-medium text-white">
                                    {blog.category.name}
                                </span>
                            </div>
                        )}
                        <button
                            onClick={handleLikeClick}
                            className={`group flex items-center gap-2 px-5 py-2.5 rounded-full transition-all duration-300 
                                ${userInfo 
                                    ? 'hover:scale-105 hover:shadow-lg dark:hover:shadow-pink-500/20' 
                                    : 'cursor-not-allowed opacity-75'
                                } 
                                ${blog.isLiked
                                    ? 'bg-gradient-to-r from-pink-100 to-rose-100 dark:from-pink-900/50 dark:to-rose-900/50 shadow-md shadow-pink-200 dark:shadow-pink-800/20'
                                    : 'bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 hover:shadow-blue-200/50 dark:hover:shadow-pink-500/20'
                                }
                                transform-gpu backface-hidden`}
                        >
                            <div className="relative">
                                {blog.isLiked ? (
                                    <FaHeart 
                                        className={`text-lg transform transition-all duration-300 
                                            text-pink-500 dark:text-pink-400
                                            group-hover:scale-110 group-hover:rotate-12`}
                                    />
                                ) : (
                                    <FaRegHeart 
                                        className={`text-lg transform transition-all duration-300 
                                            text-blue-500 dark:text-pink-400
                                            group-hover:scale-110 group-hover:-rotate-12`}
                                    />
                                )}
                                {userInfo && (
                                    <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full 
                                        bg-gradient-to-r from-pink-400 to-rose-400 
                                        animate-ping opacity-75"
                                    />
                                )}
                            </div>
                            <span className={`text-sm font-medium tracking-wide transition-colors duration-300
                                ${blog.isLiked
                                    ? 'text-pink-700 dark:text-pink-300 group-hover:text-pink-800 dark:group-hover:text-pink-200'
                                    : 'text-gray-700 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-pink-300'
                                }`}
                            >
                                {blog.likeCount || 0} 
                                <span className="ml-1 font-normal">
                                    {blog.likeCount === 1 ? 'Like' : 'Likes'}
                                </span>
                            </span>
                            
                            {/* Decorative elements */}
                            <div className={`absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 
                                transition-opacity duration-300 pointer-events-none
                                ${blog.isLiked
                                    ? 'bg-gradient-to-r from-pink-200/20 to-rose-200/20 dark:from-pink-800/20 dark:to-rose-800/20'
                                    : 'bg-gradient-to-r from-blue-200/20 to-indigo-200/20 dark:from-gray-700/20 dark:to-gray-600/20'
                                }`}
                            />
                        </button>
                    </div>

                    {blog.excerpt && (
                        <div className="mb-8 px-4 py-3 bg-blue-50 dark:bg-gray-700 rounded-lg border-l-4 border-blue-500 dark:border-pink-400">
                            <p className="text-lg italic text-gray-700 dark:text-gray-300">
                                {blog.excerpt}
                            </p>
                        </div>
                    )}

                    <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
                        {blog.content.split('\n').map((paragraph, index) => (
                            <p 
                                key={index} 
                                className="mb-6 leading-relaxed transition-all duration-300 hover:pl-4 hover:border-l-4 hover:border-blue-200 dark:hover:border-pink-200"
                            >
                                {paragraph}
                            </p>
                        ))}
                    </div>
                </article>

                <div className="mt-12 text-center">
                    {userInfo ? (
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="group relative inline-block px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-500 dark:from-pink-500 dark:to-purple-500 
                            text-white rounded-xl hover:scale-105 transition-all duration-300
                            hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.4)] dark:hover:shadow-[0_0_30px_-5px_rgba(236,72,153,0.4)]
                            font-semibold text-lg"
                        >
                            <span className="relative z-10">Create Your Own Masterpiece</span>
                            <div className="absolute inset-0 rounded-xl border-2 border-white/20 group-hover:border-white/40 transition-all duration-500" />
                        </button>
                    ) : (
                        <div className="space-y-6">
                            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300">
                                Ready to share your story? Join our creative community! ✍️
                            </p>
                            <Link
                                to="/register"
                                className="inline-block px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-500 dark:from-pink-500 dark:to-purple-500 
                                text-white rounded-xl transform hover:scale-105 transition-all duration-300
                                hover:ring-4 hover:ring-blue-200 dark:hover:ring-pink-200/30 font-semibold text-lg"
                            >
                                Start Your Blogging Journey
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