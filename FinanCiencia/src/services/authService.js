import api from './api';

const authService = {
  /**
   * Envia as credenciais do usuário para o endpoint de login da API.
   * @param {string} email - O email (ou nome de usuário) do usuário.
   * @param {string} senha - A senha do usuário.
   * @returns {Promise<any>} A resposta completa da API, que deve conter o token.
   */
  login: (email, senha) => {
    // O primeiro argumento do api.post é a URL do endpoint no seu backend.
    // O segundo argumento é o corpo (body) da requisição.
    // O backend espera receber um objeto com as chaves 'email' e 'senha'.
    return api.post('/usuario/login', { email, senha });
  }
};

export default authService;