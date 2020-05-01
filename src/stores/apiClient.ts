import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'api.bimgen.org',
})

export default apiClient