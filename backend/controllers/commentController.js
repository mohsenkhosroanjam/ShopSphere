import Comment from '../models/commentModel.js';
import Blog from '../models/blogModel.js';
import asyncHandler from '../middleware/asyncHandler.js';

const createComment = asyncHandler(async (req, res) => {
    const { content } = req.body;
    const blogId = req.params.blogId;
    const userId = req.user._id;

    if (!content) {
        return res.status(400).json({ message: 'Comment content is required' });
    }

    const blog = await Blog.findById(blogId);
    if (!blog) {
        return res.status(404).json({ message: 'Blog not found' });
    }

    const comment = await Comment.create({
        content,
        author: userId,
        blog: blogId
    });

    blog.comments.push(comment._id);
    await blog.save();

    const populatedComment = await Comment.findById(comment._id)
        .populate('author', 'username photoURL');

    res.status(201).json(populatedComment);
});

const getBlogComments = asyncHandler(async (req, res) => {
    const { blogId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const comments = await Comment.find({ blog: blogId })
        .populate('author', 'username photoURL')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

    const total = await Comment.countDocuments({ blog: blogId });

    res.json({
        comments,
        page,
        totalPages: Math.ceil(total / limit),
        total
    });
});

const updateComment = asyncHandler(async (req, res) => {
    const { content } = req.body;
    const comment = await Comment.findById(req.params.commentId);

    if (!comment) {
        return res.status(404).json({ message: 'Comment not found' });
    }

    if (comment.author.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'Not authorized to update this comment' });
    }

    comment.content = content;
    comment.updatedAt = Date.now();
    await comment.save();

    res.json(comment);
});

const deleteComment = asyncHandler(async (req, res) => {
    const comment = await Comment.findById(req.params.commentId);

    if (!comment) {
        return res.status(404).json({ message: 'Comment not found' });
    }

    if (comment.author.toString() !== req.user._id.toString() && !req.user.isAdmin) {
        return res.status(403).json({ message: 'Not authorized to delete this comment' });
    }

    const blog = await Blog.findById(comment.blog);
    if (blog) {
        blog.comments = blog.comments.filter(c => c.toString() !== comment._id.toString());
        await blog.save();
    }

    await comment.deleteOne();
    res.json({ message: 'Comment deleted' });
});

export { createComment, getBlogComments, updateComment, deleteComment }; 