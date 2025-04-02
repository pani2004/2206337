import User from '../models/user.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';

export const getTopUsers = asyncHandler(async (req, res) => {
  const topUsers = await User.find()
    .sort({ postCount: -1 })
    .limit(5)
    .select('userId username postCount');

  if (!topUsers || topUsers.length === 0) {
    throw new ApiError(404, 'No users found');
  }

  return res
    .status(200)
    .json(new ApiResponse(200, topUsers, 'Top users retrieved successfully'));
});