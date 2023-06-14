import axios from 'axios';

const API_URL = import.meta.env.VITE_APP_API_URL;

 const uploadService = {
    getUploads,
    getLastUpload,
    addUpload,
};

//récupérer la liste de tous les fichiers
async function getUploads() {
  try {
    const response = await axios.get(`${API_URL}/uploads/getUploads`);
    return response.data;
  } catch (error) {
    console.error('Error getting uploads:', error);
    throw error;
  }
}

async function getLastUpload() {
  try {
    const response = await axios.get(`${API_URL}/uploads/getLastUpload`);
    return response.data;
  } catch (error) {
    console.error('Error getting last upload:', error);
    throw error;
  }
}


//Ajouter un fichier
async function addUpload(upload) {
  try {
    const response = await axios.post(`${API_URL}/uploads/addUpload`, upload);
    return response.data;
  } catch (error) {
    console.error('Error posting upload:', error);
    throw error;
  }
}

export default uploadService;