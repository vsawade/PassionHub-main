import postService from '../Services/postService.js';

const postController = {
  //==============================================================================================
  createPost: async (req, res) => {// create post functionality
    try {    
      const userId = req.body.creator;
      const groupId = req.body.groupId;
      const content = req.body.content;
      const postImage = req.body.postImage;

      const post = await postService.createPost(userId, groupId, content,postImage);
      res.status(201).json({ success: true, post });

    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  },
//==============================================================================================
  addComment: async (req, res) => {// add comment functionality
    try {
      const postId = req.params.postId;
      const userId = req.body.creator;
      const content = req.body.content;
    

      const updatedPost = await postService.addComment(postId, userId, content);

      res.status(201).json({ success: true, post: updatedPost });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  },
//==============================================================================================
  getPosts: async (req, res) =>{// get posts of a group functionality
    try{
      const postIds = req.body.postIds;
      const posts = await postService.getPosts(postIds);
      res.status(201).json({success: true, posts: posts});
    } catch(error){
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  },
  //==============================================================================================
  getPost: async (req, res) =>{
    try{// get post by id functionality
      const postId = req.params.postId;
      const post = await postService.getPost(postId);
      res.status(201).json({success: true, post: post});
    } catch(error){
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  },
//==============================================================================================
  upvotePost: async (req, res) => {
    try {// upvote post functionality
      const postId = req.params.postId;
      const userId = req.body.userId;
      const updatedPost = await postService.upvotePost(postId, userId);
      res.status(200).json({ success: true, post: updatedPost });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  },

};

export default postController;
