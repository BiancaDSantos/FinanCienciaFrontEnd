//  procurar, buscar um, SÓ TIPO GET

import api from './api';

const projectService = {
  listProjects: () => api.get('/projeto/listar'),
  searchProjects: (title) => api.get('/projeto/buscar', { params: { tituloProjeto: title } }),
  getProjectDetails: (id) => api.get(`/projeto/visualizar/${id}`),
};

export default projectService;