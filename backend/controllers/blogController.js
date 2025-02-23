import Blog from '../models/blogModel.js';
import User from '../models/userModel.js';
import asyncHandler from '../middleware/asyncHandler.js';
import mongoose from 'mongoose';

const createBlog = asyncHandler(async (req, res) => {
    const { title, content, excerpt, category, author } = req.body;
    console.log('Request body:', req.body);
    
    if (!title || !content || !author) {
        console.log('Validation failed:', { title, content, author });
        return res.status(400).json({ 
            message: 'Title, content, and author are required',
            received: { title, content, author }
        });
    }

    const user = await User.findById(author);
    console.log('Found user:', user);
    if (!user) {
        return res.status(404).json({ message: 'User not found', authorId: author });
    }

    const existingBlog = await Blog.findOne({ title });
    if (existingBlog) {
        return res.status(400).json({ message: 'Blog with this title already exists' });
    }

    // Create a blog object without category first
    const blogData = {
        title,
        content,
        excerpt: excerpt || content.substring(0, 197) + '...',
        author: user._id
    };

    // Only add category if it's a valid ObjectId
    if (category && mongoose.Types.ObjectId.isValid(category)) {
        blogData.category = category;
    }

    try {
        const blog = await Blog.create(blogData);

        user.blogs.push(blog._id);
        await user.save();

        console.log('Created blog:', blog);
        res.status(201).json(blog);
    } catch (error) {
        console.error('Error creating blog:', error);
        res.status(400).json({
            message: 'Failed to create blog',
            error: error.message
        });
    }
});

const getBlogs = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    try {
        const totalBlogs = await Blog.countDocuments();
        const blogs = await Blog.find({})
            .populate('author', 'name')
            .populate('category', 'name')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        res.json({
            blogs,
            page,
            totalPages: Math.ceil(totalBlogs / limit),
            totalBlogs
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const getBlogById = asyncHandler(async (req, res) => {
    const blog = await Blog.findById(req.params.id)
        .populate('author', 'username')
        .populate('category', 'name');

    if (blog) {
        const isLiked = req.user ? blog.likes.includes(req.user._id) : false;
        res.json({
            ...blog.toObject(),
            isLiked
        });
    } else {
        res.status(404);
        throw new Error('Blog not found');
    }
});

const toggleBlogLike = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const userId = req.user._id;

    const blog = await Blog.findById(id);
    if (!blog) {
        res.status(404);
        throw new Error('Blog not found');
    }

    // Check if user has already liked the blog
    const isLiked = blog.likes.includes(userId);

    if (isLiked) {
        // Unlike the blog
        blog.likes = blog.likes.filter(like => like.toString() !== userId.toString());
        blog.likeCount = blog.likeCount - 1;
    } else {
        // Like the blog
        blog.likes.push(userId);
        blog.likeCount = blog.likeCount + 1;
    }

    const updatedBlog = await blog.save();

    res.json({
        message: isLiked ? 'Blog unliked' : 'Blog liked',
        likes: updatedBlog.likeCount,
        isLiked: !isLiked
    });
});

export { createBlog, getBlogs, getBlogById, toggleBlogLike };
