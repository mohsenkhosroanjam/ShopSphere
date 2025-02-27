import express from 'express';
import multer from 'multer';
import { createBlog, getBlogs, getBlogById, toggleBlogLike, editBlog, deleteBlog } from '../controllers/blogController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();
const upload = multer();

router.route('/create').post(authenticate, upload.single('image'), createBlog);
router.route('/get-blogs').get(getBlogs);
router.route('/:id').get(getBlogById).put(authenticate, upload.single('image'), editBlog).delete(authenticate, deleteBlog);
router.route('/:id/like').post(authenticate, toggleBlogLike);

export default router;