import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  postId: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, required: true },
  commentCount: { type: Number, default: 0 },
  lastUpdated: { type: Date, default: Date.now }
});

export default mongoose.model('Post', postSchema);