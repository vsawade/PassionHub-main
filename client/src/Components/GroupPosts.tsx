// GroupPosts.tsx

import React from 'react';
import Post from './Post';
import '../CSS/InsideGroup/GroupDiscussionSection.css';
import CreateNewPost from './CreateNewPost';

export interface PostData {
  comments: string[];
  content: string;
  creator: string;
  groupId: string;
  _id: string;
  postImage: string;
}
interface GroupPostsProps {
  onPostSubmit: (caption: string,postImageUrl: string) => void;
  onUpvote: (postId: string) => void;
  posts: PostData[];
  upvotesGiven: string[];
}


// GroupPosts is a component that displays all the posts in a group
const GroupPosts: React.FC<GroupPostsProps> = ({ onPostSubmit, onUpvote, posts,upvotesGiven }) => {
  const handleUpvote = async (postId: string) => {
    try {
      await onUpvote(postId);
    } catch (error) {
      console.error('Error while upvoting:', error);
    }
  };

  return (
    <div className="discussion-section">
      <CreateNewPost onPostSubmit={onPostSubmit} />
      {posts.map((post) => (
        <Post
          key={post._id}
          _id={post._id}
          content={post.content}
          creatorId={post.creator}
          postImage={post.postImage}
          onUpvote={() => handleUpvote(post._id) }
          isUpvoted={upvotesGiven.includes(post._id)}
        />
      ))}
    </div>
  );
};

export default GroupPosts;




