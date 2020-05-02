import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://api.bimgen.org',
})

export default apiClient