import React from 'react';

const Header = () => {
   return (
      <header>
         <h1>Artworks</h1>
         <div className="SearchBar">
            <label className="searchBar-label">Search:</label>
            <input type="text" />
         </div>
      </header>
   );
};

export default Header;
