import axios from 'axios';

const API_URL = import.meta.env.VITE_APP_API_URL;

 const linkedinService = {
    getLinkedinPosts,
};

//récupérer la liste de tous les téléchargementss
async function getLinkedinPosts() {
  try {
    const response = await axios.get(`${API_URL}/linkedin/getLinkedinPosts`);
    return response.data;
  } catch (error) {
    console.error('Error getting Linkedin posts:', error);
    throw error;
  }
}



export default linkedinService;