import axios from 'axios';

const api = axios.create({
  baseURL: 'https://campus-backend-8cq1.onrender.com/api/v1', // Assuming the backend runs on port 8000
});

// Add a request interceptor to include the token in the headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('campusEnergy_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
