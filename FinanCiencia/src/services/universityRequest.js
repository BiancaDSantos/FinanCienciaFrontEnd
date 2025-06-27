import api from './api';

const universityService = {
  listUniversities: () => api.get('/universidades/listar'),
};

export default universityService;