import express from 'express';
import { createComment, getBlogComments, updateComment, deleteComment } from '../controllers/commentController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/blog/:blogId', authenticate, createComment);
router.get('/blog/:blogId', getBlogComments);
router.put('/:commentId', authenticate, updateComment);
router.delete('/:commentId', authenticate, deleteComment);

export default router; 