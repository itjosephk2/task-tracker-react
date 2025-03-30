const API_BASE_URL = 'https://task-tracker-drf-e7e43a44f5b5.herokuapp.com/api/';
export default API_BASE_URL;


/**
 * Generates authentication headers for API requests.
 *
 * Retrieves the token from localStorage and, if present,
 * includes it in the Authorization header using the format `Token <token>`.
 *
 * @returns {Object} Headers object containing Content-Type and optional Authorization.
 */
export function getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Token ${token}` }),
    };
}