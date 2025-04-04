// GroupAboutSection.tsx

import React from 'react';
import '../CSS/InsideGroup/GroupAboutSection.css';

interface AboutSectionProps {
  creatorName: string;
  memberCount: number;
  isPaid: boolean;
  category: string;
}

// AboutSection is a component that displays the group's details
const AboutSection: React.FC<AboutSectionProps> = ({ creatorName, category, memberCount, isPaid }) => {
  return (
    <div className="about-section">
      <h1>About</h1>
      <hr className="divider" />
      <strong className="aboutTitles">Group Admin:</strong>
      <p className="aboutContent">{creatorName}</p>
      <strong className="aboutTitles">Category:</strong> 
      <p className="aboutContent">{category}</p>
      <strong className="aboutTitles">Group Members Count:</strong>
      <p className="aboutContent">{memberCount}</p>
      <strong className="aboutTitles">Group Type:</strong>
      <p className="aboutContent">{isPaid ? 'Paid':'Free' }</p>
    </div>
  );
};

export default AboutSection;
