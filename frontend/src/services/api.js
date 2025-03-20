import axios from "axios";
import { useApi } from "../context/ApiContext.js";           // Importa o contexto

export const useApiService = () => {
  const { apiUrl } = useApi();              // Obtém a URL da API do contexto

  const api = axios.create({
    baseURL: apiUrl,
  });

  return api;
};
