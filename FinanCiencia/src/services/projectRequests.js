/**
 * Responsabilidade: É o "mediador" entre a lógica da aplicação 
 * e a API para um recurso específico (no caso, projetos). 
 * Ele centraliza todas as operações de CRUD (Criar, Ler, Atualizar, Deletar) relacionadas a projetos.
 */

import api from './api';

const projectService = {
  listProjects: () => api.get('/projeto/listar'),
  searchProjects: (title) => api.get('/projeto/buscar', { params: { tituloProjeto: title } }),
  getProjectDetails: (id) => api.get(`/projeto/visualizar/${id}`),
};

export default projectService;