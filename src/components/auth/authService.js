import axios from 'axios';
import API_BASE_URL, { getAuthHeaders } from '../../api'; // adjust path if needed

export const login = async (credentials) => {
  return axios.post(`${API_BASE_URL}login/`, credentials, {
    headers: { 'Content-Type': 'application/json' }
  });
};

export const signup = async (userData) => {
  console.log('Calling API with:', userData);
  return axios.post(`${API_BASE_URL}signup/`, userData, {
    headers: { 'Content-Type': 'application/json' }
  });
};

// If you add protected routes later:
export const getUserData = async () => {
  return axios.get(`${API_BASE_URL}user/`, {
    headers: getAuthHeaders()
  });
};
