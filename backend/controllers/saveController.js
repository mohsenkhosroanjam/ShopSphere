import asyncHandler from '../middleware/asyncHandler.js';
import SavedArticle from '../models/saveModel.js';
import Blog from '../models/blogModel.js';
import mongoose from 'mongoose';

const saveArticle = asyncHandler(async (req, res) => {
    const { articleId } = req.body;
    const userId = req.user._id;
    
    if (!mongoose.Types.ObjectId.isValid(articleId)) {
        res.status(400);
        throw new Error('Invalid article ID');
    }

    const blog = await Blog.findById(articleId);
    if (!blog) {
        res.status(404);
        throw new Error('Article not found');
    }

    const existingSave = await SavedArticle.findOne({ user: userId, article: articleId });
    if (existingSave) {
        res.status(400);
        throw new Error('Article already saved');
    }

    const savedArticle = await SavedArticle.create({ user: userId, article: articleId });

    res.status(201).json({
        _id: savedArticle._id,
        article: blog,
        createdAt: savedArticle.createdAt
    });
});

const getSavedArticles = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const totalSaved = await SavedArticle.countDocuments({ user: userId });
    const savedArticles = await SavedArticle.find({ user: userId })
        .populate({
            path: 'article',
            populate: [
                { path: 'author', select: 'name' },
                { path: 'category', select: 'name' }
            ]
        })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

    res.json({
        savedArticles,
        page,
        totalPages: Math.ceil(totalSaved / limit),
        totalSaved
    });
});

const removeSavedArticle = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const { articleId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(articleId)) {
        res.status(400);
        throw new Error('Invalid article ID');
    }

    const savedArticle = await SavedArticle.findOneAndDelete({ user: userId, article: articleId });

    if (!savedArticle) {
        res.status(404);
        throw new Error('Saved article not found');
    }

    res.json({ message: 'Article removed from saved list' });
});

export { saveArticle, getSavedArticles, removeSavedArticle };