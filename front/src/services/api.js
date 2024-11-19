import axios from 'axios';

// Criando uma instância do Axios
const api = axios.create({
  baseURL: 'http://localhost:8000/api',  // URL do seu servidor Laravel
  headers: {
    'Content-Type': 'application/json',
  }
});

export default api;
