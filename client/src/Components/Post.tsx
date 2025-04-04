// Post.tsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import '../CSS/InsideGroup/GroupPost.css';

interface PostProps {
  _id: string;
  content: string;
  creatorId: string;
  postImage: string;
  onUpvote: () => void; 
  isUpvoted: boolean;
}
interface MemberInfo {
  username: string;
}

// Post is a component that displays a post
const Post: React.FC<PostProps> = ({ _id, content, creatorId,postImage, onUpvote,isUpvoted }) => {
  const [creatorName, setCreatorName] = useState("");

  // Get the details of the creator of the post
  const getDetailsOfCreator = async (userId: string): Promise<MemberInfo | undefined> => {
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
    }
  };

  const fetchCreatorDetails = async () => {
    const name = await getDetailsOfCreator(creatorId);
    if (name !== undefined) {
      setCreatorName(name.toString());
    }
  };
  const handleUpvote = () => {
    // Call the onUpvote prop to handle upvotes
    onUpvote();
  };

  useEffect(() => {
    fetchCreatorDetails();
  }, [creatorId]);

  return (
<div className="post">
<div className="user-info">
  <p>{creatorName}</p>
</div>
{postImage ? (
  <img className="post-image" src={postImage} />
) : (
  <p className="post-image-placeholder">No image provided</p>
)}
<p className="caption">{content}</p>
<div className="actions">
<button className={`upvote-button ${isUpvoted ? 'upvoted' : ''}`}
        onClick={handleUpvote}
        disabled={isUpvoted}
        >

           {isUpvoted ? 'Upvoted' : 'Upvote'}
      </button>
  <Link to={`/post-details/${_id}`}>
    <button className="view-post-details">
      View Post Details
    </button>
  </Link>
</div>
</div>
  );
};

export default Post;
