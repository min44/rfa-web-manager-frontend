import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://api.bimgen.org',
})

export default apiClient