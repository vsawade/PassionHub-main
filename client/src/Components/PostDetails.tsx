// PostDetails.tsx
import React, { useState, useEffect } from 'react';
import NavigationBar from './NavigationBar';
import CommentComponent from './CommentComponent';
import { useParams } from 'react-router-dom';
import '../CSS/PostDetails.css';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/index';
import CreateGroupNavigationBar from './CreateGroupNavigationBar';
import defaultImage from "../images/defaultPic.png";

interface Comment {
  user: string;
  content: string;
  post: string;
  _id: string;
}

interface postDetails {
  content: string;
  creator: string;
  groupId: string;
  upvoters: string[];
  upvotes: number;
  _id: string;
  comments: Comment[];
  postImage: string;
}

const defaultPostDetails: postDetails = {
  content: '',
  creator: '',
  groupId: '',
  upvoters: [],
  upvotes: 0,
  _id: '',
  comments: [],
  postImage: '',
};

// PostDetails is a component that displays the details of a post
const PostDetails: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const [postInfo, setPostInfo] = useState<postDetails>(defaultPostDetails);
  const [loaded, setLoaded] = useState(false);
  const [creatorName, setCreatorName] = useState("");
  const userId = useSelector((state: RootState) => state.auth.userId);
  const username = useSelector((state: RootState) => state.auth.username);
  const profilePicture = useSelector((state:RootState) => state.auth.profilePicture);
  

  // Submit a new comment to the post
  const handleNewCommentSubmit = async () => {
    try {
      if (!newComment.trim()) {
        console.log("Comment cannot be empty!");
        return;
      }
      const requestBody = {
        creator: userId,
        content: newComment, 
      };
      const response = await fetch('/api/users/add-comment/'+ postId, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }

      const data = await response.json();

      const updatedPostInfo = { ...postInfo };
      updatedPostInfo.comments.push(data.post.comments[data.post.comments.length - 1]);
      setPostInfo(updatedPostInfo);

      setNewComment('');
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  // Get the post details from the database
  const getPostInfo = async (postId: string): Promise<void> => {
    try {
      const response = await fetch('/api/users/post-details/' + postId, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
      });
      const data = await response.json();
      if (data) setPostInfo(data.post[0]);
    } catch (error) {
      console.log(error);
    }
  };

  // Get the username of the creator of the post
  const getDetailsOfMember = async (userId: string): Promise<string> => {
    try {
      const response = await fetch('/api/users/' + userId + '/details', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }
      const data = await response.json();
      return data.user.username;
    } catch (error) {
      console.error(error);
      return "Error";
    }
  };

  // Get the username of the creator of the post
  const getCreatorName = async (creator: string): Promise<void> => {
    const name = await getDetailsOfMember(creator);
    if (name !== undefined) {
      setCreatorName(name.toString());
    }
  };

  const [newComment, setNewComment] = useState('');
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  useEffect(() => {
    if (postId) {
      getPostInfo(postId);
      getCreatorName(postInfo.creator);
      setLoaded(true);
    }
  }, [postId, postInfo.creator]);

  useEffect(() => {
    setIsSubmitDisabled(newComment.trim() === '');
  }, [newComment]);

  return (
    <div className="post-details-container">
      <CreateGroupNavigationBar profilePic={profilePicture || defaultImage} />
      {loaded ? (
        <div>
          <div className="post-details">
            
            <div className="left-section">
              <div className="post-details-title">
                <div className="circle"></div>
                <h3>{creatorName}</h3>
              </div>
              <p className="post-details-caption">{postInfo.content}</p>
              <div className="comments-section">
                <CommentComponent comments={postInfo.comments} />
              </div>
              <div className="comment-input-section">
                <input
                  className="comment-input"
                  type="text"
                  placeholder="Add a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <button className="comment-btn" onClick={handleNewCommentSubmit} disabled={isSubmitDisabled}>
                  Add Comment
                </button>
              </div>
            </div>
            <div className="right-section">
              <img className="post-details-image" src={postInfo.postImage} alt="Group" />
            </div>
          </div>
        </div>
      ) : (
        <p>Loading groups...</p>
      )}
    </div>
  );
};

export default PostDetails;
