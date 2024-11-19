import api from './api';

const authService = {
  login: async (email, password) => {
    try {
      console.log('Making login request with:', { email }); // Debug log
      const response = await api.post('/users/login', { email, password });
      console.log('Login response:', response.data); // Debug log
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response.data;
    } catch (error) {
      console.error('Login error:', error); // Debug log
      throw error.response?.data || { message: 'An error occurred during login' };
    }
  },

  register: async (username, email, password) => {
    try {
      console.log('Making register request:', { username, email }); // Debug log
      const response = await api.post('/users/register', {
        username,
        email,
        password
      });
      console.log('Register response:', response.data); // Debug log

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response.data;
    } catch (error) {
      console.error('Register error:', error); // Debug log
      throw error.response?.data || { message: 'An error occurred during registration' };
    }
  },

  logout: () => {
    try {
      localStorage.removeItem('token');
      console.log('User logged out successfully'); // Debug log
    } catch (error) {
      console.error('Logout error:', error); // Debug log
    }
  },

  getCurrentUser: () => {
    try {
      const token = localStorage.getItem('token');
      console.log('Current user token:', token ? 'exists' : 'none'); // Debug log
      return token;
    } catch (error) {
      console.error('Get current user error:', error); // Debug log
      return null;
    }
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    const token = localStorage.getItem('token');
    return !!token;
  },

  // Get auth token
  getToken: () => {
    return localStorage.getItem('token');
  }
};

export default authService;