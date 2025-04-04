import React, { useState, useEffect } from 'react';
import '../CSS/Profile.css';
import CreateGroupNavigationBar from './CreateGroupNavigationBar';
import { useSelector,useDispatch } from 'react-redux';
import { RootState } from '../redux';
import { updateProfilePicture } from '../redux/auth/authActions';
import { Button } from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
import LogoutIcon from "@mui/icons-material/Logout";
import {logoutRequest,logoutSuccess,logoutFailure} from "../redux/auth/authActions";
import { useNavigate } from "react-router-dom";
import defaultImage from "../images/defaultPic.png";
import { useTranslation } from 'react-i18next';
import { Select, MenuItem } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';

interface UserData {
  _id: string;
  username: string;
  password: string;
  email: string;
  categoryPreferences: string[];
  wallet: number;
  upvotes: number;
  upvotesGiven: string[];
  badge: string;
  createdGroups: string[];
  groupMemberships: string[];
  createdPosts: string[];
  comments: string[];
  __v: number;
  profilePicture: string;
}

// Profile page is the page that displays the user's profile
const Profile: React.FC = () => {
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const userId = useSelector((state: RootState) => state.auth.userId);
  const profilePicture = useSelector((state:RootState) => state.auth.profilePicture);
  const { t ,i18n} = useTranslation();
  const [userData, setUserData] = useState<UserData>({
    _id: "",
    username: "",
    password: "",
    email: "",
    categoryPreferences: [],
    wallet: 0,
    upvotes: 0,
    upvotesGiven: [],
    badge: "",
    createdGroups: [],
    groupMemberships: [],
    createdPosts: [],
    comments: [],
    __v: 0,
    profilePicture: "",
  });
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(e.target.files?.[0] || null);
  };

  // Changes the language of the page
  const changeLanguage = (event: SelectChangeEvent<string>) => {
    i18n.changeLanguage(event.target.value);
  };
  // Uploads the image to the backend
  const handleSave = async () => {
    if (selectedFile) {
      const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onloadend = async () => {
      const base64Image = reader.result as string;

      const response = await fetch(`/api/users/${userId}/upload-profile-picture`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ profilePicture: base64Image })
      });

      if (response.ok) {
        alert('Image upload successful!');
        dispatch(updateProfilePicture(base64Image));
      }
    }
  }
  };

  // Gets the user's information from the backend
  const getUserInfo = async (userId: string): Promise<string> => {
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
      setUserData({
        ...data.user,
        profilePicture: undefined, 
      });
      return data.user;
    } catch (error) {
      console.error(error);
      return "Error";
    }
  };

  useEffect(() => {
    if (userId) getUserInfo(userId);
  }, [userId]);
  const navigate = useNavigate();
  const onLogout = () => {
    dispatch(logoutRequest());
    dispatch(logoutSuccess());
    navigate("/login", { replace: true });
  };

  return (
    <div className="profile-page">
      <CreateGroupNavigationBar profilePic={profilePicture || defaultImage} />
      <div className="profile-container">
      <div className='profile-details'>
        <div className="left-side">
        <div className="label">
            {/* <img src={userData.profilePicture} alt="profile image" className="profileImage" /> */}
            {userData.username}
        </div>
            
          <div className="email-section">
            <strong className="heading">{t('email')}</strong>
            <div>{userData.email}</div>
          </div>
          <div className="votes-section">
            <strong className="heading">{t('totalUpvotes')}</strong>
            <div>{userData.upvotes}</div>
          </div>
          <div className="credits-section">
            <strong className="heading">{t('walletBalance')}</strong>
            <div>{userData.wallet}</div>
          </div>
          <Button
              variant="contained"
              color="error"
              startIcon={<LogoutIcon />}
              onClick={onLogout}
            >
              {t('logout')}
            </Button>
            <br />
            <Select className="internationalization" value={i18n.language} onChange={changeLanguage}>
          <MenuItem value={'en'}>English</MenuItem>
          <MenuItem value={'fr'}>French</MenuItem>
        </Select>
        </div>
        <div className="right-side">
          <div className="circle-container">
            <div className="upload-circle">
                <img src={profilePicture || defaultImage } alt="Selected" className="user-profile-image" /> 
            </div>
            <div className="upload-photo">
              <strong>{t('uploadImage')}</strong>
              <input className='profile-input' type="file" accept="image/*" onChange={handleImageUpload} />
              <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#5aff36",
                    color: "#000000",
                    marginTop: "20px",
                    minWidth: "100px",
                  }}
                  onClick={handleSave}
                  className="imgSave"
                  startIcon={<UploadIcon />}
                >
                  {t('upload')}
                </Button>
            </div>
          </div> 
        </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;