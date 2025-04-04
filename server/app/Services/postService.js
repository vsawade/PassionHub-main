import Post from '../Models/postModel.js';
import User from '../Models/userModel.js';
import Group from '../Models/groupModel.js';
import Comment from '../Models/commentModel.js';

const createPostService = {
  //==============================================================================================
    createPost: async (userId, groupId, content,postImage) => {// create post functionality
      
      const newpost = await Post.create({
        groupId: groupId,
        creator: userId,
        content: content,
        postImage: postImage,
      });
      
      const updatedGroup = await Group.findByIdAndUpdate(
        groupId,
        {$addToSet:{postsInGrp: newpost._id}}
      );

      const updatedUser = await User.findByIdAndUpdate(
        userId,
        {$addToSet:{createdPosts: newpost._id }}
      );

        return newpost;
      },
//==============================================================================================
     addComment: async (postId, userId, content) => {// add comment functionality
        try {
          const updatedPost = await Post.findByIdAndUpdate(
            postId,
            {
              $push: { comments: { user: userId, content: content } },
            },
            { new: true }
          );
      
          const comment = await Comment.create({
            creator: userId,
            content: content,
            post: postId,
          });
      
          const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $addToSet: { comments: comment._id } },
            { new: true }
          );
      
          return updatedPost;
        } catch (error) {
          throw error;
        }
      },
//==============================================================================================
     getPosts: async (postIds) => {// get posts of a group functionality
        try{
          const posts = await Post.find({ _id: { $in: postIds } });
          return posts;
        } catch(error){
          throw(error);
        }
      },
//==============================================================================================
      getPost: async (postId) => {// get post by id functionality
        try{
          const post = await Post.find({ _id:  postId });
          return post;
        } catch(error){
          throw(error);
        }
      },
//==============================================================================================     
      upvotePost: async (postId, userId) => {// upvote post functionality
        try {
          const post = await Post.findById(postId);
          if (post.upvoters.includes(userId)) {
            throw new Error('User has already upvoted this post.');
          }    
          const updatedPost = await Post.findByIdAndUpdate(
            postId,
            {
              $inc: { upvotes: 1 },
              $addToSet: { upvoters: userId },
            },
            { new: true }
          );
          const userWhoGaveUpvote = await User.findByIdAndUpdate(
            userId,
            {
              $addToSet: { upvotesGiven: postId },
            },
            { new: true }
          );
          const userWhoReceivedUpvote = await User.findByIdAndUpdate(
            updatedPost.creator,
            {
              $inc: { wallet: 1,upvotes: 1 },
            },
            { new: true }
          );
          await userWhoReceivedUpvote.updateBadge();
         
          return updatedPost;
        } catch (error) {
          throw error;
        }
      },
    
};

export default createPostService;