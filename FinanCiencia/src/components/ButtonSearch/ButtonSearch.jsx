import React, { useState } from 'react';
import './Ret retractableSearchButton.css'; // We'll create this CSS file next

const RetractableSearchButton = ({ onSearch }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
    // Optionally clear search term when closing
    if (isOpen) {
      setSearchTerm('');
    }
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault(); // Prevent page reload
    if (onSearch) {
      onSearch(searchTerm);
    }
    // Optionally close the search bar after submitting
    // setIsOpen(false);
  };

  return (
    <div className="retractable-search-container">
      <button className="search-toggle-button" onClick={handleButtonClick}>
        {isOpen ? 'Fechar Busca' : 'Buscar'}
      </button>

      {isOpen && (
        <form onSubmit={handleSearchSubmit} className="search-input-form">
          <input
            type="text"
            placeholder="Digite para buscar..."
            value={searchTerm}
            onChange={handleInputChange}
            className="search-input-field"
          />
          <button type="submit" className="submit-search-button">
            🔍
          </button>
        </form>
      )}
    </div>
  );
};

export default RetractableSearchButton;