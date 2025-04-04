import mongoose from 'mongoose';
const Schema = mongoose.Schema;


//Comment Schema for MongoDB
const commentSchema = new Schema({
  creator: { type: Schema.Types.ObjectId, ref: 'User' },
  content: { type: String, required: true },
  post: { type: Schema.Types.ObjectId, ref: 'Post' },
});

const Comment = mongoose.model('Comment', commentSchema);
export default Comment;
