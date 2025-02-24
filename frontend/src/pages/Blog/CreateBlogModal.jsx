import { useState } from "react";
import { useSelector } from "react-redux";
import { useCreateBlogMutation } from "../redux/api/blogApiSlice";

const CreateBlogModal = ({ isOpen, onClose }) => {
    const { userInfo } = useSelector((state) => state.auth);
    const [createBlog, { isLoading: isCreating }] = useCreateBlogMutation();
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        excerpt: '',
        author: userInfo?._id
    });
    const [image, setImage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const blogData = new FormData();
            blogData.append('title', formData.title);
            blogData.append('content', formData.content);
            blogData.append('excerpt', formData.excerpt);
            blogData.append('author', userInfo?._id);
            if (formData.category) {
                blogData.append('category', formData.category);
            }
            if (image) {
                blogData.append('image', image);
            }

            await createBlog(blogData).unwrap();
            onClose();
            setFormData({
                title: '',
                content: '',
                excerpt: '',
                author: userInfo?._id
            });
            setImage(null);
        } catch (err) {
            console.error('Failed to create blog:', err);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg w-full max-w-md shadow-xl">
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Create New Blog</h2>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <input
                            type="text"
                            placeholder="Title"
                            value={formData.title}
                            onChange={(e) => setFormData({...formData, title: e.target.value})}
                            className="w-full p-2 rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                            required
                        />
                        <textarea
                            placeholder="Content"
                            value={formData.content}
                            onChange={(e) => setFormData({...formData, content: e.target.value})}
                            className="w-full p-2 rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-pink-500 focus:border-transparent h-32"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Excerpt (optional)"
                            value={formData.excerpt}
                            onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                            className="w-full p-2 rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                        />
                        <input
                            type="text"
                            placeholder="Category"
                            value={formData.category}
                            onChange={(e) => setFormData({...formData, category: e.target.value})}
                            className="w-full p-2 rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                        />
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setImage(e.target.files[0])}
                            className="w-full p-2 rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                        />
                    </div>
                    <div className="flex justify-end gap-2 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded transition-colors duration-200"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-pink-600 hover:bg-pink-700 dark:bg-pink-500 dark:hover:bg-pink-600 text-white rounded transition-colors duration-200 disabled:opacity-50"
                            disabled={isCreating}
                        >
                            {isCreating ? 'Creating...' : 'Create'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateBlogModal; 