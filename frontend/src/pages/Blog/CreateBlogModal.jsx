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
            
            await createBlog(blogData).unwrap();
            onClose();
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

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-gray-900 p-8 rounded-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">Create New Blog</h2>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <input
                            type="text"
                            placeholder="Title"
                            value={formData.title}
                            onChange={(e) => setFormData({...formData, title: e.target.value})}
                            className="w-full p-2 rounded bg-gray-800"
                            required
                        />
                        <textarea
                            placeholder="Content"
                            value={formData.content}
                            onChange={(e) => setFormData({...formData, content: e.target.value})}
                            className="w-full p-2 rounded bg-gray-800 h-32"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Excerpt (optional)"
                            value={formData.excerpt}
                            onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                            className="w-full p-2 rounded bg-gray-800"
                        />
                        <input
                            type="text"
                            placeholder="Category"
                            value={formData.category}
                            onChange={(e) => setFormData({...formData, category: e.target.value})}
                            className="w-full p-2 rounded bg-gray-800"
                        />
                    </div>
                    <div className="flex justify-end gap-2 mt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-700 rounded"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-pink-500 rounded"
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