import React, { useState, useEffect } from 'react';
import '../CSS/CommentComponent.css';

interface CommentProps { //props received by commentcomponent
  user: string;
  content: string;
  post: string;
  _id: string;
}
// CommentComponent is a component that displays all the comments of a post
const CommentComponent: React.FC<{ comments: CommentProps[] }> = ({ comments }) => {
  const [loaded, setLoaded] = useState(false);
  const [names, setNames] = useState<string[]>([]);


  // getCommenterName is a function that returns the username of the commenter
  const getCommenterName = async (userId: string): Promise<string | undefined> => {
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
      console.log(error);
      return undefined;
    }
  };

  useEffect(() => {
    const fetchUsernames = async () => {
      const usernamePromises = comments
        .filter((comment) => comment.user) // Filter out comments with undefined or null users and content
        .map((comment) => getCommenterName(comment.user!)); // Use non-null assertion operator

      const usernames = await Promise.all(usernamePromises);

      // Handle the case where a username is undefined
      setNames(usernames.filter((username) => username !== undefined) as string[]);

      setLoaded(true);
    };

    if (Array.isArray(comments) && comments.length > 0) {
      fetchUsernames();
    }
  }, [comments.length]); // runs everytime the length of the comments change

  if (!loaded) {
    return <p className="hasLoaded">No comments...</p>; // default case when there are no comments available
  }

  return (
    <div>
      {comments.map((comment, index) => ( // mapping the array of comments to display on the screen
        <div key={comment._id} className="comment">
          <div className="commenter-details">
            <p className="username">{names[index] || 'Unknown User'}</p>
          </div>
          |
          <div className="comment-content">
            <p className="comment-text">{comment.content || 'No Content'}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentComponent;
