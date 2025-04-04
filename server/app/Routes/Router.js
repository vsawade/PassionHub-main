import express from 'express';
import { upload } from '../app.js';
import userController from '../Controllers/userController.js';
import postController from '../Controllers/postController.js';
import groupController from '../Controllers/groupController.js';

const router = express.Router();

router.post('/register', userController.registerUser); // registration route
router.post('/login', userController.loginUser); // login route
router.post('/updatePreferences', userController.updateCategoryPreferences);
router.post('/getPreferences', userController.getCategoryPreferences); //get user category preferences
router.post('/create-post', upload.single('postImage'), postController.createPost); // create new post route
router.post('/create-group', upload.single('groupImage'), groupController.createGroup); // create new group route
router.post('/home/getRecommendations', groupController.getGroupsByCategory); //get group recommendations upon registration
router.post('/join-group', groupController.joinGroup); // join grp route
router.post('/home/:userId', groupController.getGroupsRegistered); // retrieving all the registered groups to display on screen
router.post('/add-comment/:postId', postController.addComment); // comment route
router.post('/:userId/details', userController.getUserInfo);// get user info route
router.post('/group/:groupId', groupController.getGroupInfo);// get group info route
router.post('/group/:groupId/posts', postController.getPosts);// get posts of a group route
router.post('/upvote-post/:postId', postController.upvotePost);// upvote post route
router.post('/post-details/:postId', postController.getPost);// get post by id route
router.post('/groups/search', groupController.searchGroups); // search groups route
router.post('/:userId/upload-profile-picture', upload.single('profilePicture'), userController.uploadProfilePicture); // upload profile picture route
export default router;