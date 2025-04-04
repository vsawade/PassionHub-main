// App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import './App.css';
import Login from './Components/Login';
import RegisterUser from './Components/RegisterUser';
import Home from './Components/Home';
import Profile from './Components/Profile';
import GroupMainPage from './Components/GroupMainPage';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Preferences from './Components/Preferences';
import UserProfileCard from './Components/UserProfileCard';
import PostDetails from './Components/PostDetails';
import CreateGroup from './Components/CreateGroup';


const theme = createTheme({
  typography: {
    fontFamily: 'Poppins, sans-serif',
  },
  
});

function App() {
  return (
    <ThemeProvider theme={theme}>
    <Router>
      <div className="App">
        <Routes>
        <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterUser />} />
          <Route path="/home/:userId" element={<Home userId={""} />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/group/:groupId" element={<GroupMainPage groupId={""} />} />
          <Route path="/preferences/:userId" element={<Preferences userId={""}/>} />
          <Route path="/post-details/:postId" element={<PostDetails />} />
          <Route path="/create-group" element={<CreateGroup />} />
        </Routes>
      </div>
    </Router>
    </ThemeProvider>
  );
}

export default App;
