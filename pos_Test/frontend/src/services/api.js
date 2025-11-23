import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
      window.location.href = '/';
    }
    
    if (error.response?.status === 422) {
      const errors = error.response.data.errors;
      const firstError = Object.values(errors)[0][0];
      throw new Error(firstError);
    }
    
    const message = error.response?.data?.message || error.message || 'Something went wrong';
    throw new Error(message);
  }
);

// Auth API
export const authAPI = {
  login: (credentials) => api.post('/login', credentials),
  register: (userData) => api.post('/register', userData),
  logout: () => api.post('/logout'),
  getUser: () => api.get('/user'),
};

// Users API
export const usersAPI = {
  getUsers: () => api.get('/users'),
  createUser: (userData) => api.post('/users', userData),
  updateUser: (id, userData) => api.put(`/users/${id}`, userData),
  deleteUser: (id) => api.delete(`/users/${id}`),
};

// Products API
export const productsAPI = {
  getProducts: () => api.get('/products'),
  createProduct: (productData) => api.post('/products', productData),
  updateProduct: (id, productData) => api.put(`/products/${id}`, productData),
  deleteProduct: (id) => api.delete(`/products/${id}`),
  searchProduct: (query) => api.get(`/products/search/${query}`),
  getLowStock: () => api.get('/products/low-stock'),
  getNearExpiry: () => api.get('/products/near-expiry'),
};

// Sales API
export const salesAPI = {
  getSales: (params) => api.get('/sales', { params }),
  createSale: (saleData) => api.post('/sales', saleData),
  getSale: (id) => api.get(`/sales/${id}`),
  getDailyReport: (date) => api.get('/sales/daily-report', { params: { date } }),
  getSalesSummary: (params) => api.get('/sales/summary', { params }),
};

export default api;