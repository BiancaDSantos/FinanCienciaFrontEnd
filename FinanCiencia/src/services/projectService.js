/**
 * Responsabilidade: É o "mediador" entre a lógica da aplicação 
 * e a API para um recurso específico (no caso, projetos). 
 * Ele centraliza todas as operações de CRUD (Criar, Ler, Atualizar, Deletar) relacionadas a projetos.
 */

import api from './api';

const projectService = {

  listProjects: (page = 0, size = 10) =>
    api.get('/projeto/listar', {
      params: {
        page,
        size
      }
    }),
  searchProjects: (title) => api.get('/projeto/buscar', { params: { tituloProjeto: title } }),
  getProjectDetails: (id) => api.get(`/projeto/visualizar/${id}`),
  deleteProject: (id) => api.delete(`/projeto/excluir/${id}`),
  newProject: (projectData) => api.post(`/projeto/novo`, projectData),
  editProject: (id, updatedData) => api.put(`projeto/editar/${id}`, updatedData)
};

export default projectService;