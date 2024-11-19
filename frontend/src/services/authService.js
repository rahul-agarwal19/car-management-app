import api from './api';

const authService = {
  register: async (username, email, password) => {
    try {
      const response = await api.post('/users/register', {
        username,
        email,
        password
      });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response.data;
    } catch (error) {
      console.error('Registration Error:', error.response || error);
      if (error.response?.data) {
        throw error.response.data;
      }
      throw { message: 'Registration failed. Please try again.' };
    }
  },

  login: async (email, password) => {
    try {
      const response = await api.post('/users/login', {
        email,
        password
      });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Login failed' };
    }
  },

  logout: () => {
    localStorage.removeItem('token');
  }
};

export default authService;