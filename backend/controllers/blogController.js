import Blog from '../models/blogModel.js';
import User from '../models/userModel.js';
import asyncHandler from '../middleware/asyncHandler.js';

const createBlog = asyncHandler(async (req, res) => {
    const { title, content, excerpt, category, author } = req.body;

    if (!title || !content || !author) {
        return res.status(400).json({ message: 'Title, content, and author are required' });
    }

    const user = await User.findById(author);

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    const existingBlog = await Blog.findOne({ title });

    if (existingBlog) {
        return res.status(400).json({ message: 'Blog with this title already exists' });
    }

    const blog = await Blog.create({
        title,
        content,
        excerpt: excerpt || content.substring(0, 197) + '...',
        category,
        slug: title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-'),
        author
    });

    user.blogs.push(blog._id);
    await user.save();

    if (blog) {
        res.status(201).json(blog);
    } else {
        res.status(400);
        throw new Error('Invalid blog data');
    }
});

const getBlogs = asyncHandler(async (req, res) => {
    const blogs = await Blog.find({})
        .populate('author', 'username')
        .populate('category', 'name')
        .sort({ createdAt: -1 });

    res.json(blogs);
});

const getBlogById = asyncHandler(async (req, res) => {
    const blog = await Blog.findById(req.params.id)
        .populate('author', 'username')
        .populate('category', 'name');

    if (blog) {
        res.json(blog);
    } else {
        res.status(404);
        throw new Error('Blog not found');
    }
});

export { createBlog, getBlogs, getBlogById };
