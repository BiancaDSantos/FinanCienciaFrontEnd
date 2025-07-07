import React from 'react';
import styles from './Modal.module.css';

// Ícone de Fechar (SVG)
const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
);

function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) {
    return null;
  }

  return (
    // O 'overlay' é o fundo escuro
    <div className={styles.overlay} onClick={onClose}>
      {/* O 'modalContent' é a janela branca. O e.stopPropagation() impede que o clique nela feche o modal. */}
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <header className={styles.modalHeader}>
          <h2>{title}</h2>
          <button onClick={onClose} className={styles.closeButton}>
            <CloseIcon />
          </button>
        </header>
        <main className={styles.modalBody}>
          {children}
        </main>
      </div>
    </div>
  );
}

export default Modal;
