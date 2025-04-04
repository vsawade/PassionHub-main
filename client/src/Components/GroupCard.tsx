import React, { useState } from 'react';
import '../CSS/GroupCard.css';
import Modal from './Modal'; 
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/index';

interface GroupCardProps {
  groupData: {
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
  };
  userWalletBalance: number;
}

// GroupCard component is a card that displays the group's details
const GroupCard: React.FC<GroupCardProps> = ({ groupData, userWalletBalance }) => {
  const { _id, name, desc, members, isPaid, membershipFee, groupImage } = groupData;
  const userId = useSelector((state: RootState) => state.auth.userId);
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);

  const handleJoinClick = () => {
    setModalOpen(true);
  };
  // Handle modal confirm button click to join group
  const handleModalConfirm = async () => {
    if (isPaid && membershipFee > userWalletBalance) {
      alert(`You don't have enough credits to join the group. You have ${userWalletBalance} credits in your balance. But you need ${membershipFee} to join the group.`);
    } else {
      try {
        const requestBody = {
          userId: userId,
          groupId: _id,
        };

        const response = await fetch('/api/users/join-group', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
          throw new Error(`Request failed with status: ${response.status}`);
        }

        const data = await response.json();
        navigate('/group/' + _id);
      } catch (error) {
        console.error(error);
      }
    }

    setModalOpen(false);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <div className={`group-card ${isPaid ? 'free' : 'paid'}`}>
      <div className="group-card-image" style={{ backgroundImage: `url(${groupImage})` }}></div>
      <div className="group-details">
        <h2>{name}</h2>
        <p className="group-description">{desc}</p>

        <div className="member-count-tag">Members</div>
        <div className="membership-info">
          <p className="member-count">{members.length}</p>
          <button className={`membership-type ${isPaid ? 'paid' : 'free'}`} onClick={handleJoinClick}>
            {isPaid ? 'Paid' : 'Free'}
          </button>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={handleModalClose} onConfirm={handleModalConfirm} />
    </div>
  );
};

export default GroupCard;
