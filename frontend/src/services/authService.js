import api from './api';

export const authService = {
  login: async (email, password) => {
    return await api.post('/auth/login/', { email, password });
  },

  register: async (userData) => {
    return await api.post('/auth/register/', userData);
  },

  requestPasswordReset: async (email) => {
    return await api.post('/auth/password-reset/', { email });
  },

  confirmPasswordReset: async (data) => {
    return await api.post('/auth/password-reset-confirm/', data);
  },

  getProfile: async () => {
    return await api.get('/auth/profile/');
  },

  updateProfile: async (data) => {
    return await api.put('/auth/profile/', data);
  },
};
