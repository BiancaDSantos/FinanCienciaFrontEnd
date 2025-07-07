import React, { useState, useRef, useEffect } from 'react';
import styles from './ButtonSearch.module.css';

// Ícone de Lupa (SVG)
const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

// Ícone de Fechar (SVG) - Representa "Limpar Pesquisa"
const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
);

function ButtonSearch({ onSearch }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [inputError, setInputError] = useState(false); // Estado para controlar o erro
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  // Função para executar a busca
  const executeSearch = () => {
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim());
      setIsSearchActive(true);
      setIsOpen(true);
      setInputError(false); // Limpa o erro em uma busca válida
    } else {
      // Lógica para tratar o erro de input vazio
      setInputError(true);
      inputRef.current?.focus();
      // Remove a classe de erro após 500ms para a animação poder rodar novamente
      setTimeout(() => setInputError(false), 500);
    }
  };

  // Função para limpar a busca
  const clearSearch = () => {
    setSearchTerm('');
    onSearch('');
    setIsSearchActive(false);
    setIsOpen(false);
    setInputError(false); // Limpa o erro ao limpar a busca
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    executeSearch();
  };

  const handleButtonClick = () => {
    if (isSearchActive) {
      clearSearch();
    } else {
      if (!isOpen) {
        setIsOpen(true);
      } else {
        executeSearch();
      }
    }
  };

  const handleInputChange = (e) => {
    const newTerm = e.target.value;
    setSearchTerm(newTerm);
    if (isSearchActive && newTerm === '') {
      onSearch('');
      setIsSearchActive(false);
    }
  };

  const containerClasses = `${styles.searchContainer} ${isOpen ? styles.open : ''}`;
  // A classe do input é dinâmica, incluindo a classe de erro quando necessário
  const inputClasses = `${styles.searchInput} ${inputError ? styles.error : ''}`;

  return (
    <div className={containerClasses}>
      <form onSubmit={handleFormSubmit} className={styles.searchForm}>
        <input
          ref={inputRef}
          type="text"
          placeholder="Buscar projetos..."
          value={searchTerm}
          onChange={handleInputChange}
          className={inputClasses} // Classe dinâmica aplicada aqui
        />
      </form>
      <button onClick={handleButtonClick} className={styles.searchButton} aria-label="Buscar ou Limpar Pesquisa">
        {isSearchActive ? <CloseIcon /> : <SearchIcon />}
      </button>
    </div>
  );
}

export default ButtonSearch;
