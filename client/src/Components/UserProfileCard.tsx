// UserProfileCard.tsx

import React from 'react';
import { Card, CardContent, Typography, CardMedia, Avatar, Grid } from '@mui/material';
import '../CSS/UserProfileCard.css';
import {useNavigate} from 'react-router-dom';

interface userProfileProps{
  name: string;
  upvotes: number;
  badge: string;
  profilePicture: string;
}

// UserProfileCard is a component that displays the user's profile card
const UserProfileCard: React.FC<userProfileProps> = ({name, upvotes, badge, profilePicture}) => {
  const navigate = useNavigate();
  return (
    
    <Card className="user-profile-card" onClick={() => navigate('/profile')}>
      <CardMedia component="img" height="150" image={profilePicture} alt="Background" />
      <CardContent className="card-content">
        <Avatar className="profile-avatar" alt={name} src={profilePicture} />
        <Typography variant="h5" className="user-name">
          {name}
        </Typography>
        <hr />
        <Grid container justifyContent="space-between" className="stats-container">
          <Grid item>
            <Typography variant="h6">{upvotes}</Typography>
            <Typography variant="body2">Upvotes</Typography>
          </Grid>
          <div className="vertical-line"></div>
          <Grid item>
            <Typography variant="h6">{badge}</Typography>
            <Typography variant="body2">Badge Earned</Typography>
          </Grid>
        </Grid>
       
      </CardContent>
    </Card>
  );
};

export default UserProfileCard;
