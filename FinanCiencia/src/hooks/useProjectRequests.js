// src/hooks/useProjectActions.js
import { useState } from 'react';
import projectRequest from '../services/projectRequests'

const useProjectActions = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [lastSearchQuery, setLastSearchQuery] = useState('');

  const handleVisualizeProject = async (id) => {
    try {
      const response = await projectRequest.getProjectDetails(id);
      setSelectedProject(response.data);
      setIsDetailsModalOpen(true);
    } catch (error) {
      console.error("Erro ao carregar dados do projeto:", error);
      // Aqui você poderia usar um hook de notificação, se tivesse um
      alert("Não foi possível carregar os detalhes do projeto.");
    }
  };

  const handleCloseDetailsModal = () => {
    setIsDetailsModalOpen(false);
    setSelectedProject(null);
  };

  // Funções para gerenciamento da busca (opcional, pode ficar no componente da página também)
  const handleSearchProjects = async (title) => {
    setLastSearchQuery(title); // Guarda a última busca, útil para recarregar
    try {
      const response = await projectRequest.searchProjects(title);
      return response.data; // Retorna os dados para o componente pai
    } catch (error) {
      console.error("Erro ao buscar o projeto:", error);
      if (error.response && error.response.status === 404) {
        alert('Nenhum projeto localizado.');
        return []; // Retorna um array vazio
      } else {
        alert("Ocorreu um erro ao buscar o projeto. Por favor, tente novamente.");
        throw error; // Propaga o erro se for grave
      }
    }
  };

  return {
    selectedProject,
    isDetailsModalOpen,
    handleVisualizeProject,
    handleCloseDetailsModal,
    handleSearchProjects,
    lastSearchQuery
  };
};

export default useProjectActions;