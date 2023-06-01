import axios from 'axios';

const API_URL = import.meta.env.VITE_APP_API_URL;

 const downloadService = {
    getDownloads,
    addDownload,
};

//récupérer la liste de tous les téléchargementss
async function getDownloads() {
  try {
    const response = await axios.get(`${API_URL}/downloads/getDownloads`);
    return response.data;
  } catch (error) {
    console.error('Error getting downloads:', error);
    throw error;
  }
}


//Ajouter un téléchargement
async function addDownload(download) {
  try {
    const response = await axios.post(`${API_URL}/downloads/addDownload`, download);
    return response.data;
  } catch (error) {
    console.error('Error posting download:', error);
    throw error;
  }
}

export default downloadService;