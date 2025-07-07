import React from 'react';
import ProjectCard from '../ProjectCard/ProjectCard';
import styles from './ProjectList.module.css';

/**
 * Renderiza uma grade de ProjectCards.
 * @param {{ projects: any[], loading: boolean, error: any }} props
 */
function ProjectList({ projects, loading, error }) {
  if (loading) {
    return <p className={styles.message}>Carregando projetos...</p>;
  }

  if (error) {
    return <p className={styles.message}>Ocorreu um erro ao buscar os projetos. Tente novamente.</p>;
  }

  if (!projects || projects.length === 0) {
    return <p className={styles.message}>Nenhum projeto encontrado.</p>;
  }

  return (
    <div className={styles.listContainer}>
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}

export default ProjectList;