import React from 'react';
import Button from '../Button/Button';
import styles from './ProjectCard.module.css';

/**
 * Exibe um card com as informações resumidas de um projeto.
 * @param {{ project: { id: number, tituloProjeto: string, descricao: string, universidade: { nome: string } } }} props
 */
function ProjectCard({ project }) {
  // Esta verificação inicial já é uma ótima prática!
  if (!project) {
    return null;
  }

  // Desestruturação com valores padrão para garantir que nenhuma propriedade seja nula.
  // Se a API não enviar um desses campos, o valor à direita do "=" será usado.
  const { 
    id, 
    tituloProjeto = 'Título não disponível', 
    descricao = '', // Usar string vazia como padrão para a descrição é ideal
    universidade = null 
  } = project;

  // Limita a descrição para 100 caracteres e adiciona '...' se for maior.
  const shortDescription = descricao.length > 100 
    ? `${descricao.substring(0, 100)}...` 
    : descricao;

  return (
    // Melhoria 1: Usando <article> para melhor semântica.
    <div className="container">
      <article className={styles.card}>
        <div>
          <h3 className={styles.cardTitle}>{tituloProjeto}</h3>
          
          {/* Melhoria 2: Usando a variável pré-formatada e tratando o caso de descrição vazia. */}
          <p className={styles.cardDescription}>
            {shortDescription || 'Descrição não fornecida.'}
          </p>
        </div>
        
        <div className={styles.cardFooter}>
          <span className={styles.universityName}>
            {/* A sua implementação aqui já era excelente! */}
            {universidade?.nome || 'Universidade não informada'}
          </span>
          
          {/* Garantimos que o link não quebre se o ID for nulo (embora improvável) */}
          <Button to={`/projects/${id || ''}`}>Ver Detalhes</Button>
        </div>
      </article>
    </div>
  );
}

export default ProjectCard;