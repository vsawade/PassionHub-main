import React from 'react'
import {AppBar, Toolbar, Typography, IconButton, Avatar} from '@mui/material';
import SearchBar from './SearchBar';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/index';

import '../CSS/NavigationBar.css';
interface navbarProps {
  profilePic: string;
  walletBalance: number;
  onSearch: (query: string) => void;
}

// NAVIGATION BAR FOR HOME PAGE
const NavigationBar: React.FC<navbarProps> =({profilePic, walletBalance, onSearch}) =>{
  const navigate = useNavigate();
  const userId = useSelector((state: RootState) => state.auth.userId);

  const handleSearch = (query:string) => {
    onSearch(query);
  }
  
  const handleProfile = ()=>{
  navigate('/profile');
  }
  const handleAppTitle =() =>{
    navigate('/home/'+userId); 
  }
  return (
    <AppBar position="fixed" sx={{backgroundColor:"white", border: "none", textAlign:"left", padding:"1vmin", boxShadow:"none", borderBottom: "3px solid #e3e3e3"}}>
            <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: "700", fontSize: "5vmin"}}>
              <a onClick={handleAppTitle} className="passion-hub">PassionHub</a>
            </Typography>
            <SearchBar onSearch={handleSearch}/>
              <Typography variant="body1" sx={{ marginRight: '1rem' }} className='walletbn'>
                <Avatar alt="Wallet Icon" src={'/coins.png'} sx={{ marginRight: '0.5rem' }} className='avatarimg'/>
                {walletBalance} Coins {/* Display wallet balance */}
              </Typography> 
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleProfile}
                color="inherit"
              > 
                <Avatar
                  alt="User Profile"
                  src={profilePic}
                  sx={{border: "solid 1px black"}}
                  className='avatarimg'
                />
              </IconButton>
            </Toolbar>
          </AppBar>
  )
}

export default NavigationBar;