import Blog from '../models/blogModel.js';
import User from '../models/userModel.js';
import asyncHandler from '../middleware/asyncHandler.js';

// @desc    Create a new blog
// @route   POST /api/blogs
// @access  Private/Admin
const createBlog = asyncHandler(async (req, res) => {
    const { title, content, excerpt, category, author } = req.body;

    if (!title || !content || !author) {
        return res.status(400).json({ message: 'title, content, auther is required' });
    }

    const user = await User.findById(author);

    if(!user) {
        return res.status(400).json({ message: 'User not found' });
    }

    const blog = await Blog.create({
        title,
        content,
        excerpt,
        category,
        author 
    });

    if (blog) {
        res.status(201).json(blog);
    } else {
        res.status(400);
        throw new Error('Invalid blog data');
    }
});

// @desc    Get all blogs
// @route   GET /api/blogs
// @access  Public
const getBlogs = asyncHandler(async (req, res) => {
    const blogs = await Blog.find({})
        .populate('author', 'username')
        .populate('category', 'name')
        .sort({ createdAt: -1 });

    res.json(blogs);
});

// @desc    Get blog by ID
// @route   GET /api/blogs/:id
// @access  Public
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
