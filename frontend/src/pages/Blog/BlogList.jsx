import { useState } from "react";
import { Link } from "react-router-dom";
import { useGetBlogsQuery, useCreateBlogMutation } from "../redux/api/blogApiSlice";
import Loader from "../../components/Loader";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import CreateBlogModal from './CreateBlogModal';

const BlogList = () => {
    const [page, setPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { userInfo } = useSelector((state) => state.auth);
    const { data, isLoading, error } = useGetBlogsQuery({ page, limit: 6 });
    const [createBlog, { isLoading: isCreating }] = useCreateBlogMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const blogData = {
                ...formData,
                author: userInfo?._id,
                ...(formData.category && formData.category.trim() !== '' && {
                    category: formData.category
                })
            };
            
            console.log('Submitting blog data:', blogData);
            await createBlog(blogData).unwrap();
            setIsModalOpen(false);
            setFormData({
                title: '',
                content: '',
                excerpt: '',
                author: userInfo?._id
            });
        } catch (err) {
            console.error('Failed to create blog:', err);
        }
    };

    if (isLoading) return <Loader />;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="from-gray-100 to-white dark:from-gray-900 dark:to-black py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold text-center">Latest Blog Posts</h1>
                    {userInfo && (
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="px-4 py-2 bg-pink-500 rounded hover:bg-pink-600"
                        >
                            Create Blog
                        </button>
                    )}
                </div>

                <CreateBlogModal 
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {data.blogs.map((blog) => (
                        <Link
                            key={blog._id}
                            to={`/blog/${blog._id}`}
                            className="bg-gray-900 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-transform duration-200"
                        >
                            <div className="p-6">
                                <h2 className="text-xl font-semibold mb-2 text-pink-500">
                                    {blog.title}
                                </h2>
                                <p className="text-gray-400 text-sm mb-4">
                                    {format(new Date(blog.createdAt), 'MMMM dd, yyyy')}
                                </p>
                                <p className="text-gray-300 mb-4">{blog.excerpt}</p>
                                <div className="flex items-center text-sm text-gray-400">
                                    <span>Read more →</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {data.totalPages > 1 && (
                    <div className="flex justify-center mt-8 gap-2">
                        <button
                            onClick={() => setPage(p => Math.max(1, p - 1))}
                            disabled={page === 1}
                            className="px-4 py-2 z-0 bg-pink-500 rounded disabled:opacity-50"
                        >
                            Previous
                        </button>
                        <button
                            onClick={() => setPage(p => p + 1)}
                            disabled={page === data.totalPages}
                            className="px-4 py-2 bg-pink-500 rounded disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BlogList; 