import axios from 'axios';

const API_URL = import.meta.env.VITE_APP_API_URL;

 const userService = {
    getGestimumClients,
    getGestimumUsers,
};

//récupérer la liste de tous les utilisateurs
async function getGestimumClients() {
  try {
    const response = await axios.get(`${API_URL}/gestimum/getGestimumClients`);
    return response.data;
  } catch (error) {
    console.error('Error getting clients:', error);
    throw error;
  }
}
//récupérer un utilisateur
async function getGestimumUsers(userId) {
  try {
    const response = await axios.get(`${API_URL}/users/getUser/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error getting user:', error);
    throw error;
  }
}


export default userService;