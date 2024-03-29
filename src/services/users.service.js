import axios from 'axios';

const API_URL = import.meta.env.VITE_APP_API_URL;

 const userService = {
  getUsers,
  getUser,
  postUser,
  updateUser,
  updatePassword,
  deleteUser
};

//récupérer la liste de tous les utilisateurs
async function getUsers() {
  try {
    const response = await axios.get(`${API_URL}/users/getUsers`);
    return response.data;
  } catch (error) {
    console.error('Error getting users:', error);
    throw error;
  }
}
//récupérer un utilisateur
async function getUser(userId) {
  try {
    const response = await axios.get(`${API_URL}/users/getUser/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error getting user:', error);
    throw error;
  }
}

//Ajouter un utilisateur
async function postUser(user) {
  try {
    const response = await axios.post(`${API_URL}/users/addUser`, user);
    return response.data;
  } catch (error) {
    console.error('Error posting user:', error);
    throw error;
  }
}

async function updateUser(id, user) {
  try {
    const response = await axios.put(`${API_URL}/users/updateUser/${id}`, user);
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
}

async function updatePassword(user) {
  try {
    const response = await axios.put(`${API_URL}/users/updatePassword/${user.id}`, user);
    return response.data;
  } catch (error) {
    console.error('Error updating password:', error);
    throw error;
  }
}

async function deleteUser(userId) {
  try {
    const response = await axios.delete(`${API_URL}/users/deleteUser/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
}

export default userService;