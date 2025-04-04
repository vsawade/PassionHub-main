import React from 'react';
import '../CSS/InsideGroup/MyGroupMembers.css';

interface memberProps{
  memberNames: string[];
}

const ListofMyGroups: React.FC<memberProps> = ({memberNames}) => {
  
  return (
   
    <div className="groupmember-cards-container">
          {memberNames.map((member) => (
            <div  className="mygroupmember-card"> 
              <p className="groupmember-name">{member}</p>
            </div>
          ))}
        </div>
  );
};

export default ListofMyGroups;