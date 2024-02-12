import axios from 'axios';

const API_URL = import.meta.env.VITE_APP_API_URL; // Replace with your API URL

 const authService = {
  login,
  register,
  getLogins,
  forgotPassword
};

//Login
async function login(form) {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, form);
    return response.data;
  } catch (error) {
    console.error('Error login:', error);
    throw error;
  }
}

//Register
async function register(user) {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, user);
    return response.data;
  } catch (error) {
    console.error('Error register:', error);
    throw error;
  }
}

//Récupérer tous les logins
async function getLogins() {
  try {
    const response = await axios.get(`${API_URL}/auth/getLogins`);
    return response.data;
  } catch (error) {
    console.error('Error getting logins:', error);
    throw error;
  }
}

async function forgotPassword(email) {
  try {
    const response = await axios.post(`${API_URL}/auth/forgotPassword`, email);
    return response.data;
  } catch (error) {
    console.error('Error forgot password:', error);
    throw error;
  }
}


export default authService;