// Um objeto do tipo axios
// adicionar tratamento de erros e atutenticação

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// erros ou autenticação
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 404) {
      // retorna uma página 404
    }
    return Promise.reject(error);
  }
);

export default api;

