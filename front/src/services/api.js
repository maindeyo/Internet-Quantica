import axios from 'axios';

const api = axios.create({
  baseURL: 'http://http://localhost:8000/api',  
  headers: {
    'Content-Type': 'application/json',
  }
});

export default api;
