// Home.tsx

import React, {useEffect, useState} from 'react';
import GroupCard from './GroupCard';
import MyGroups from './MyGroups';
import '../CSS/home.css'; 
import {Grid} from '@mui/material';
import NavigationBar from './NavigationBar';
import { useSelector } from 'react-redux';
import UserProfileCard from './UserProfileCard';
import {useNavigate, useParams} from 'react-router-dom';
import { RootState } from '../redux';
import defaultImage from "../images/defaultPic.png";

interface HomeProps{
  userId: string;
}
interface Group {
  _id: string;
  name: string;
  desc: string;
  category: string;
  isPaid: boolean;
  members: string[];
  creator: string;
  postsInGrp: string[];
  membershipFee: number;
  groupImage: string;
}

// Home page is the main page of the application
const Home: React.FC<HomeProps> = () => {
  const { userId } = useParams<{ userId: string }>();
  const [name, setName] = useState("");
  const [upvotes, setUpvotes] = useState(0);
  const [walletBalance, setWalletBalance] = useState(0);
  const [badge, setBadge] = useState("Bronze");
  const [recommendedGroupsInfo, setRecommendedGroupsInfo]= useState<Group[]>([]);
  const [receivedRecommendations, setReceivedRecommendations] = useState<boolean | null>(null);
  const [registeredGroups, setRegisteredGroups] = useState<Group[]>([]);
  const [receivedRegisteredGroups, setReceivedRegisteredGroups] = useState<boolean | null>(null);
  const profilePicture = useSelector((state:RootState) => state.auth.profilePicture);


  //=====================================================================================================================//
  // Get recommendations for the user based on their preferences
  const getRecommendations = async (userId: string, categories: string[]): Promise<void> =>{
    try{
      const requestBody = {
        userId: userId,
        categories: categories
      };
      const response = await fetch('/api/users/home/getRecommendations',{
        method: 'POST',
        headers:{
          'Content-type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
      const data = await response.json();
      setRecommendedGroupsInfo(data.filteredGroups);
      if(data.filteredGroups.length>0)
        setReceivedRecommendations(true);

    }catch(error){
      console.error(error);
    }
  }
  //=====================================================================================================================//
  // Get user preferences
  const getPreferences = async (userId: string): Promise<void> =>{
    try{
      const requestBody = {
        userId: userId
      };
      const response = await fetch('/api/users/getPreferences',{
        method: 'POST',
        headers:{
          'Content-type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }
      const data = await response.json();
      getRecommendations(userId, data.categories);

    }catch(error){
      console.error(error);
    }
  }
  //=====================================================================================================================//
  // Get user group memberships
  const getGroupMemberships = async (): Promise<void> =>{
    try{

      const response = await fetch('/api/users/home/'+userId,{
        method: 'POST',
        headers:{
          'Content-type': 'application/json',
        }
      });
      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }
      const data = await response.json();
      setRegisteredGroups(data.registeredGroups);
      setReceivedRegisteredGroups(true);
    }catch(error){
      console.error(error);
    }
  }
 //=====================================================================================================================//
 // Get user info
 const getUserInfo = async (userId: string): Promise<void> =>{
  try{
    const response = await fetch('/api/users/'+userId+'/details',{
      method: 'POST',
      headers:{
        'Content-type': 'application/json',
      }
    });
    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }
    const data = await response.json();
    setName(data.user.username);
    setUpvotes(data.user.upvotes);
    setBadge(data.user.badge);
    setWalletBalance(data.user.wallet);

  }catch(error){
    console.error(error);
  }
}
//=====================================================================================================================//
// Handle search bar
const handleSearch = async (query: string) => {
  try {
    const requestBody = { searchQuery: query };
    const response = await fetch('/api/users/groups/search', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (response.ok) {
      const data = await response.json();
      setRecommendedGroupsInfo(data.searchResults);
      if (data.searchResults.length > 0) setReceivedRecommendations(true);
    } else {
      setReceivedRecommendations(false);
    }
  } catch (error) {
    console.error(error);
    setReceivedRecommendations(false);
  }
};
  //=====================================================================================================================//
  
  
  
  useEffect(()=>{
    if(userId){ 
      getPreferences(userId);
      getGroupMemberships();
      getUserInfo(userId);
    }
  },[userId]);

  return (
    <Grid container className='maingrid-container'>
      <NavigationBar profilePic={profilePicture || defaultImage} walletBalance={walletBalance} onSearch={handleSearch}/>

      <Grid container item xs={12} id="recommendationsHeader">
            <h2>Based on your interests,</h2>
      </Grid>

      <Grid container item xs={12} id="main-content">
        <Grid item xs={12} sm={4} >
          <UserProfileCard name={name} upvotes={upvotes} badge={badge} profilePicture={profilePicture || defaultImage} />
          {receivedRegisteredGroups ? 
             <MyGroups registeredGroups={registeredGroups} /> 
             : 
             <p>Loading groups...</p>
          }
         
        </Grid>
        <Grid container item xs={12} sm={8} id="groupsContainer">
          {receivedRecommendations  && recommendedGroupsInfo.length > 0 ? (
            recommendedGroupsInfo.map( group =>(
              <Grid item xs={12} sm={6}>
                <GroupCard key={group._id} groupData={group} userWalletBalance={walletBalance}  />
              </Grid>
            ))
          ): (
            <p>Loading groups...</p>
          )}
          
        </Grid>

      </Grid>
    </Grid>
  );
};

export default Home;
