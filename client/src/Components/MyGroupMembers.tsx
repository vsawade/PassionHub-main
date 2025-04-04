import React from "react";
import "../CSS/InsideGroup/MyGroupMembers.css";
import ListofGroupMembers from "./ListofGroupMembers";

interface memberProps{
    memberNames: string[];
}

// MyGroupMembers is a component that displays the group's members
const MyGroupMembers: React.FC<memberProps>= ({memberNames}) => {
    return (
        <div className="group-members-container">
            <div className="member-list">
                <h1>Group Members</h1>
                <ListofGroupMembers memberNames={memberNames}  />
            </div>
        </div>
    )
}
export default MyGroupMembers;