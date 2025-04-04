import React from 'react'
import {AppBar, Toolbar, Typography, IconButton, Avatar, Grid} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/index';
import '../CSS/NavigationBar.css';

interface navbarProps { 
  profilePic: string
}
// NAVIGATION BAR FOR CREATE GROUP PAGE
const CreateGroupNavigationBar: React.FC<navbarProps> =({profilePic}) =>{
  const navigate = useNavigate(); // this is used to navigate between pages
  const userId = useSelector((state: RootState) => state.auth.userId); // using redux to access user id

  
  const handleProfile = ()=>{
  navigate('/profile');
  }
  const handleAppTitle =() =>{
    navigate('/home/'+userId); 
  }
  // navbar created using material ui. This navbar is for all screens except home screen where the search functionality exists
  return (
    <AppBar position="fixed" sx={{backgroundColor:"white", border: "none", textAlign:"left", padding:"1vmin", boxShadow:"none", borderBottom: "3px solid #e3e3e3"}}>
            
            <Toolbar sx={{ justifyContent: "space-between" }} > 
              <Grid container>

                <Grid item xs={5}>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: "700", fontSize: "5vmin"}}>
                    <a onClick={handleAppTitle} className="passion-hub">PassionHub</a>
                  </Typography>
                </Grid>

                <Grid item xs={3}>
                </Grid>

                <Grid item xs={1}>

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
                    />
                  </IconButton>
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
  )
}

export default CreateGroupNavigationBar;

