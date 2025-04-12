import axios from 'axios';
import API_BASE_URL, { getAuthHeaders } from '../../api';

// LOGIN FUNCTION
export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_BASE_URL}login/`, credentials, {
      headers: { 'Content-Type': 'application/json' },
    });

    return response.data;
  } catch (err) {
    console.error('Login error:', err.response?.data || err.message);
    throw new Error(
      err.response?.data?.detail || 'Login failed'
    );
  }
};

// SIGNUP FUNCTION
export const signup = async (userData) => {
  try {
    console.log('Calling API with:', userData);

    const response = await axios.post(`${API_BASE_URL}register/`, userData, {
      headers: { 'Content-Type': 'application/json' },
    });

    console.log('Signup successful:', response.data);
    return response.data;
  } catch (err) {
    console.error('Signup error:', err.response?.data || err.message);

    throw new Error(
      err.response?.data?.detail ||
      err.response?.data?.username?.[0] ||
      'Signup failed'
    );
  }
};

// GET USER DATA (protected route example)
export const getUserData = async () => {
  return axios.get(`${API_BASE_URL}user/`, {
    headers: getAuthHeaders()
  });
};
