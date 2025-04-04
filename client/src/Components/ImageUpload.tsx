import React, { useState } from 'react';
import { Button, Input, Paper, Typography } from '@mui/material';
 
type ImageUploadProp = {
  onImageSubmitted: (image: string) => boolean;
};

// ImageUploader is a component that allows users to upload an image
const ImageUploader: React.FC<ImageUploadProp> = ({ onImageSubmitted }) => {
  const [image, setImage] = useState<string | null>(null);
  const [isImageUploaded, setIsImageUploaded] = useState(false);
 
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
 
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        onImageSubmitted(reader.result as string);
        setIsImageUploaded(true);
        
      };
      reader.readAsDataURL(file);
    } else {
      setImage(null);
      setIsImageUploaded(false);
    }
  };
 
  return (
<Paper style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
{/* <Typography variant="h5" gutterBottom>
        Image Uploader
</Typography> */}
<Input
        
        type="file"
        inputProps={{ accept: 'image/*' }}
        onChange={handleImageChange}
        style={{ marginBottom: '20px' }}
      />
      {image && (
<div>
<Typography variant="body1" style={{ marginBottom: '10px' }}>
            Preview:
</Typography>
<img src={image} alt="Preview" style={{ maxWidth: '100%', height: 'auto' }} />
</div>
      )}
 <Button variant="contained" color="primary" onClick={() => {
    if (isImageUploaded) {
      alert('Image Uploaded');
    } else {
      alert('Please select an image to upload.');
    }
  }}>
        Upload
</Button>
</Paper>
  );
};
 
export default ImageUploader;