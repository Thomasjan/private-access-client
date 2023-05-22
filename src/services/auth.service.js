import axios from 'axios';

const API_URL = 'http://localhost:3000/api'; // Replace with your API URL

 const authService = {
  login,
  register,
};

async function login(form) {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, form);
    return response.data;
  } catch (error) {
    console.error('Error login:', error);
    throw error;
  }
}

async function register(user) {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, user);
    return response.data;
  } catch (error) {
    console.error('Error register:', error);
    throw error;
  }
}

export default authService;