import express from 'express';
import { createBlog, getBlogs, getBlogById, toggleBlogLike } from '../controllers/blogController.js';
import { authenticate } from '../middleware/authMiddleware.js';
    
const router = express.Router();

router.route('/create').post(authenticate, createBlog);
router.route('/get-blogs').get(getBlogs);
router.route('/:id').get(getBlogById);
router.route('/:id/like').post(authenticate, toggleBlogLike);

export default router;