import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://api.bimgen.org',
  // baseURL: 'http://localhost:3000',
  // baseURL: 'http://192.168.1.3:3000',
})

export default apiClient