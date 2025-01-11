import express from 'express';
import { createBlog, getBlogs, getBlogById } from '../controllers/blogController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
    .post(protect, admin, createBlog)
    .get(getBlogs);

router.route('/:id')
    .get(getBlogById);

export default router; 