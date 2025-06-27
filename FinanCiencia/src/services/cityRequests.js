import api from './api';

const cityService = {
  listCities: () => api.get('/cidades/listar'),
};

export default cityService;