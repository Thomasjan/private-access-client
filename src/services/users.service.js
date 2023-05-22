import axios from 'axios';

const API_URL = import.meta.env.VITE_APP_API_URL;

 const userService = {
  getUsers,
  postUser,
};

async function getUsers() {
    console.log(API_URL)
  try {
    const response = await axios.get(`${API_URL}/users/getUsers`);
    return response.data;
  } catch (error) {
    console.error('Error getting users:', error);
    throw error;
  }
}

async function postUser(user) {
  try {
    const response = await axios.post(`${API_URL}/users/addUser`, user);
    return response.data;
  } catch (error) {
    console.error('Error posting user:', error);
    throw error;
  }
}

export default userService;