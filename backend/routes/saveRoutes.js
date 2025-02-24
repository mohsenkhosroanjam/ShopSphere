import express from 'express';
import { saveArticle, getSavedArticles, removeSavedArticle } from '../controllers/saveController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authenticate, saveArticle);
router.get('/', authenticate, getSavedArticles);
router.delete('/:articleId', authenticate, removeSavedArticle);

export default router;