import Post from '../models/post.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';

export const getTopPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find()
    .sort({ commentCount: -1 })
    .limit(1);

  if (!posts || posts.length === 0) {
    throw new ApiError(404, 'No posts found');
  }

  const maxComments = posts[0].commentCount;
  const topPosts = await Post.find({ commentCount: maxComments });

  return res
    .status(200)
    .json(new ApiResponse(200, topPosts, 'Top posts retrieved successfully'));
});

export const getLatestPosts = asyncHandler(async (req, res) => {
  const latestPosts = await Post.find()
    .sort({ timestamp: -1 })
    .limit(5);

  if (!latestPosts || latestPosts.length === 0) {
    throw new ApiError(404, 'No posts found');
  }

  return res
    .status(200)
    .json(new ApiResponse(200, latestPosts, 'Latest posts retrieved successfully'));
});