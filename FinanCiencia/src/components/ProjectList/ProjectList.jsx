import React from 'react';
import CardProject from '../CardProject/CardProject'; // Importe o componente CardProject
import './ProjectList.css'; // Crie este CSS para o grid de cards

function ProjectList({ projects, onVisualize }) { // Renomeado de ProjectTable para ProjectList para melhor semântica
    return (
        <div className="project-list-container"> {/* Novo container para os cards */}
            {projects.length > 0 ? (
                projects.map(projeto => (
                    <CardProject
                        key={projeto.id}
                        project={projeto}
                        onVisualize={onVisualize}
                    />
                ))
            ) : (
                <p className="no-projects-message">Nenhum projeto encontrado.</p>
            )}
        </div>
    );
}

export default ProjectList;