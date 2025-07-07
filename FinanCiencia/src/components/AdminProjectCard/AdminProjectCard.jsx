import React from 'react';
import styles from './AdminProjectCard.module.css';

/**
 * Card para exibir um projeto no painel de administração com botões de ação.
 */
function AdminProjectCard({ project, onEdit, onDelete }) {
  if (!project) {
    return null;
  }

  // CORREÇÃO: Usando 'descricaoProjeto' que é o nome vindo da API.
  const { 
    id, 
    tituloProjeto = 'Título não disponível', 
    descricaoProjeto = '' // Alterado de 'descricao' para 'descricaoProjeto'
  } = project;

  return (
    <article className={styles.card}>
      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>{tituloProjeto}</h3>
        <p className={styles.cardDescription}>
          {/* Agora a descrição correta será exibida */}
          {descricaoProjeto.substring(0, 120)}{descricaoProjeto.length > 120 && '...'}
          {!descricaoProjeto && 'Descrição não fornecida.'}
        </p>
      </div>
      <div className={styles.cardActions}>
        <button 
          onClick={() => onEdit(project)} // Passa o objeto inteiro para edição
          className={`${styles.actionButton} ${styles.editButton}`}
        >
          Editar
        </button>
        <button 
          onClick={() => onDelete(project)} // Passa o objeto inteiro para exclusão
          className={`${styles.actionButton} ${styles.deleteButton}`}
        >
          Excluir
        </button>
      </div>
    </article>
  );
}

export default AdminProjectCard;
