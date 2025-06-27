// src/hooks/useFetch.js
import { useState, useEffect } from 'react';
import api from '../services/api'; // Importa sua instância do Axios

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
  const [refetchIndex, setRefetchIndex] = useState(0); // Para forçar uma nova busca

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get(url, { params });
        setData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, params, refetchIndex]); // Dependências: a URL, os parâmetros e o refetchIndex

  const refetch = () => setRefetchIndex(prev => prev + 1);

  return { data, loading, error, refetch };
};

export default useFetch;