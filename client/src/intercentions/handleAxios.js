import axios from 'axios';

const apiUrl = 'http://localhost:5000/api/';

const apiClient = axios.create({
  baseURL: apiUrl,
});
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default apiClient;
