import React from 'react';
import styles from './Pagination.module.css';

/**
 * Renderiza os controles de navegação para a paginação.
 * @param {{ 
 * currentPage: number, 
 * totalPages: number, 
 * onPageChange: (page: number) => void 
 * }} props
 */
function Pagination({ currentPage, totalPages, onPageChange }) {
  // Não renderiza nada se houver apenas uma página ou nenhuma
  if (totalPages <= 1) {
    return null;
  }

  // Função para ir para a página anterior
  const handlePrevious = () => {
    // Só muda de página se não estiver na primeira (página 0)
    if (currentPage > 0) {
      onPageChange(currentPage - 1);
    }
  };

  // Função para ir para a próxima página
  const handleNext = () => {
    // Só muda de página se não estiver na última
    if (currentPage < totalPages - 1) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <nav className={styles.paginationNav} aria-label="Navegação de página">
      <button 
        onClick={handlePrevious} 
        disabled={currentPage === 0} // Desabilita o botão se estiver na primeira página
        className={styles.pageButton}
      >
        Anterior
      </button>

      <span className={styles.pageInfo}>
        Página {currentPage + 1} de {totalPages}
      </span>

      <button 
        onClick={handleNext} 
        disabled={currentPage === totalPages - 1} // Desabilita o botão se estiver na última página
        className={styles.pageButton}
      >
        Próxima
      </button>
    </nav>
  );
}

export default Pagination;
