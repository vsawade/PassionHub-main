// SearchBar.tsx

import React, { useState } from 'react';
import '../CSS/SearchBar.css'; // Import your CSS file

interface SearchBarProps {
  onSearch: (query: string) => void;
}

// SearchBar is a component that displays a search bar
const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  return (
    <div className="search-bar-container">
      <input
        className="navbarSearch"
        type="text"
        placeholder="Find your passion..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button className='searchbarbutton' onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
