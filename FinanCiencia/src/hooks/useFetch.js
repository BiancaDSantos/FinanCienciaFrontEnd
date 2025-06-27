/**
 * Responsabilidade: É um Custom Hook React que encapsula a lógica de requisição e
 *  gerenciamento de estado de dados assíncronos (GET, principalmente) de forma genérica. 
 *  Objetivo: simplificar o uso de chamadas de API em componentes React.
 */


import { useState, useEffect } from 'react';
import api from '../services/api'; // Importa a instância do Axios, conexão com a api.

/**
 * Hook personalizado para fazer requisições GET a uma API.
 * @param {string} url - A URL do endpoint da API.
 * @param {object} params - Parâmetros da requisição (opcional).
 * @returns {{ data: any, loading: boolean, error: any, refetch: () => void }}
 */
const useFetch = (url, params = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refetchIndex, setRefetchIndex] = useState(0); // Força nova busca

  useEffect(() => {
    /**
     * Inicia o carregamento e limpa os erros anteriores
     */
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      /**
       * Tenta fazer uma requisição usando a instância da API
       */
      try {
        const response = await api.get(url, { params });
        /**
         * Se consegue, insere novos dados no data.
         */
        setData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        /**
         * Finaliza o carregamento, independentemente do sucesso ou falha
         */
        setLoading(false);
      }
    };

    fetchData();
  }, [url, params, refetchIndex]); // Dependências: a URL, os parâmetros e o refetchIndex

  const refetch = () => setRefetchIndex(prev => prev + 1);

  return { data, loading, error, refetch };
};

export default useFetch;