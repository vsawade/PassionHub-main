import React, { useState } from 'react';
import ImageUploader from './ImageUpload';
import '../CSS/InsideGroup/CreateNewPost.css';

interface CreateNewPostProps {
  onPostSubmit: (caption: string, postImage: string) => void;
}

// CreateNewPost is a component that allows users to create a new post
const CreateNewPost: React.FC<CreateNewPostProps> = ({ onPostSubmit }) => {

  const [caption, setCaption] = useState('');
  const [postImage, setPostImage] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  

  const handleCaptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCaption(e.target.value);
  };

  // onImageSubmitted is a function that sets the post image
  const onImageSubmitted = (image: string): boolean => {
    if (image) {
      setPostImage(image);
      return true;
    }
    return false;
  };



  const handleSubmit = async () => {
    onPostSubmit(caption, postImage);
    setCaption('');
    setPostImage('');
    setShowPopup(false);
    alert('Post created successfully!'); 
  };

  return (
    <div className="create-new-post">
      <button className="create-post-button" onClick={() => setShowPopup(true)}>
        Create New Post
      </button>
      {showPopup && (
        <div className="post-popup">
          <div className="popup-content">
            <input
              type="text"
              placeholder="Write your post caption..."
              value={caption}
              onChange={handleCaptionChange}
            />
            <ImageUploader onImageSubmitted={onImageSubmitted} />
            <button className="post-button" onClick={handleSubmit}>
              Post
            </button>
          </div>
          <button className="close-popup" onClick={() => setShowPopup(false)}>
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default CreateNewPost;
