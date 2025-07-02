import React from 'react';
// import './CardProject.css'; // Supondo que você terá um CSS para o card

const CardProject = ({ project, onVisualize }) => {
    return (
        <div className="card-project" onClick={() => onVisualize(project.id)}>
            <div className="card-header">
                <h3>{project.tituloProjeto}</h3>
            </div>
            <div className="card-body">
                <p><strong>Universidade:</strong> {project.universidade ? project.universidade.nome : project.nomeUniversidade}</p>
                {/* Adicione mais detalhes do projeto aqui conforme necessário */}
                {/* Por exemplo, descrição, alunos, email, cidade, etc. */}
                {/* <p>{project.descricaoProjeto}</p> */}
                {/* <p>Alunos: {project.alunos}</p> */}
            </div>
            <div className="card-footer">
                <button onClick={(e) => { e.stopPropagation(); onVisualize(project.id); }}>Visualizar</button>
            </div>
        </div>
    );
};

export default CardProject;