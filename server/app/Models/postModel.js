import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import User from '../Models/userModel.js';
import Group from '../Models/groupModel.js';

//Post Schema for MongoDB
const postSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    postImage: {
      type: String,
  },
    //relationships
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'User', 
      required: true
    },
    groupId: {
      type: Schema.Types.ObjectId,
      ref: 'Group',
      required: true
    },
  upvotes: {
    type: Number,
    default: 0
},
upvoters: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
}],
    comments: [{
      user: {
          type: Schema.Types.ObjectId,
          ref: 'User'
      },
      content: {
          type: String,
          required: true
      }
    }]

});

const Post = mongoose.model('Post', postSchema);


export default Post;