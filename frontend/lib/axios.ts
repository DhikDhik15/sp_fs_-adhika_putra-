import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000', // sesuaikan dengan backend
  withCredentials: true, // penting untuk cookie JWT
});

export default instance;
