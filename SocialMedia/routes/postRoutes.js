import express from 'express';
import { getTopPosts, getLatestPosts } from '../controllers/postsController.js';

const router = express.Router();

router.get('/', (req, res, next) => {
  const { type } = req.query;
  
  if (type === 'popular') {
    return getTopPosts(req, res, next);
  } else if (type === 'latest') {
    return getLatestPosts(req, res, next);
  } else {
    return res.status(400).json(
      new ApiResponse(400, null, 'Invalid type parameter. Use "popular" or "latest"')
    );
  }
});

export default router;