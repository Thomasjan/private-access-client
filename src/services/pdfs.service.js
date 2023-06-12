import axios from 'axios';

const API_URL = import.meta.env.VITE_APP_API_URL;

 const uploadService = {
    getSupportsPdfs,
    editSupportPdf,
    addSupportPdf,
    deleteSupportPdf
};

//récupérer la liste de tous les fichiers
async function getSupportsPdfs() {
  try {
    const response = await axios.get(`${API_URL}/pdfs/getSupportsPdfs`);
    return response.data;
  } catch (error) {
    console.error('Error getting pdfs:', error);
    throw error;
  }
}

async function editSupportPdf(id, data) {
  try {
    const response = await axios.put(`${API_URL}/pdfs/editSupportPdf/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error editing pdf:', error);
    throw error;
  }
}
async function addSupportPdf(data) {
  try {
    const response = await axios.post(`${API_URL}/pdfs/addSupportPdf`, data);
    return response.data;
  } catch (error) {
    console.error('Error adding pdf:', error);
    throw error;
  }
}

async function deleteSupportPdf(id) {
    try {
        const response = await axios.delete(`${API_URL}/pdfs/deleteSupportPdf/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting pdf:', error);
        throw error;
    }
}



export default uploadService;