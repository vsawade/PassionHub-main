import React from 'react';
import '../CSS/MyGroups.css';
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
interface myListProps{
  registeredGroups: Group[];
}

// MyGroups component is a card that displays the group's details
const ListofMyGroups: React.FC<myListProps> = ({registeredGroups}) => {
  const navigate = useNavigate();
  
  const handleClick = (groupId: string)=>{ 
    navigate('/group/'+groupId);
  }
  
  return (
    <div className="group-cards-container">
          {registeredGroups.map((group) => (
            <div key={group._id} className="mygroup-card" onClick={() => handleClick(group._id)}>
              <div className="listofmygroup-image" style={{ backgroundImage: `url(${group.groupImage})` }}></div>
              <p>{group.name}</p>
            </div>
          ))}
        </div>
  );
};

export default ListofMyGroups;