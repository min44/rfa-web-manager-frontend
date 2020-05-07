import axios from 'axios';

const apiClient = axios.create({
  // baseURL: 'https://api.bimgen.org',
  baseURL: 'http://localhost:3000',
})

export default apiClient