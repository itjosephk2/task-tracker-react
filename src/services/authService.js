import axios from 'axios';
import API_BASE_URL, { getAuthHeaders } from '../api';

/**
 * Sends a login request to the API with provided credentials.
 *
 * @param {Object} credentials - The user's login details.
 * @param {string} credentials.username - The username.
 * @param {string} credentials.password - The password.
 * @returns {Promise<Object>} The response data containing the authentication token and user info.
 * @throws {Error} If login fails.
 */
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

/**
 * Sends a signup request to the API with the new user's data.
 *
 * @param {Object} userData - The user's registration data.
 * @param {string} userData.username - The desired username.
 * @param {string} userData.email - The user's email address.
 * @param {string} userData.password - The user's password.
 * @returns {Promise<Object>} The response data confirming successful signup.
 * @throws {Error} If signup fails.
 */
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

/**
 * Retrieves user data from the protected `/user/` endpoint.
 *
 * @returns {Promise<Object>} The user data from the API.
 * @throws {Error} If the request fails.
 */
export const getUserData = async () => {
  return axios.get(`${API_BASE_URL}user/`, {
    headers: getAuthHeaders()
  });
};
