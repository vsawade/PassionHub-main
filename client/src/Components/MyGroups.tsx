// MyGroupsComponent.jsx

import React from 'react';
import '../CSS/MyGroups.css'; // Import your CSS file
import ListofMyGroups from './ListofMyGroups';
import {useNavigate} from 'react-router-dom';
interface Group{
  _id: string;
  name: string;
  desc: string;
  category: string;
  isPaid: boolean;
  members: string[];
  creator: string;
  postsInGrp: string[];
  groupImage: string;
}
interface myGroupsProps{
  registeredGroups: Group[];
}

// MyGroups component is a card that displays the group's details
const MyGroups: React.FC<myGroupsProps> = ({registeredGroups}) => {  
  const navigate = useNavigate();
  const createGroup = ()=>{
    navigate('/create-group');
  }
    return (
      <div className="passion-groups-container-home">
    <div className="passion-groups-container">
      <button className="create-group-btn" onClick={()=>createGroup()}>Create Passion Group</button>
      <div className="your-groups">
        <h2>Your Groups</h2>
        <ListofMyGroups registeredGroups={registeredGroups} />
      </div>
    </div></div>
  );
};

export default MyGroups;
