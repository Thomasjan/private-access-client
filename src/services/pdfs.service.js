import axios from 'axios';

const API_URL = import.meta.env.VITE_APP_API_URL;

 const pdfService = {
    getSupportsPdfs,
    editPdf,
    addPdf,
    deletePdf,
    getAideVentePdfs
};
//Pdfs de la page Suppport
async function getSupportsPdfs() {
  try {
    const response = await axios.get(`${API_URL}/pdfs/getSupportsPdfs`);
    return response.data;
  } catch (error) {
    console.error('Error getting pdfs:', error);
    throw error;
  }
}

//Pdfs de la page Aide à la vente
async function getAideVentePdfs() {
  try {
    const response = await axios.get(`${API_URL}/pdfs/getAideVentePdfs`);
    return response.data;
  } catch (error) {
    console.error('Error getting pdfs:', error);
    throw error;
  }
}

async function editPdf(id, data) {
  try {
    const response = await axios.put(`${API_URL}/pdfs/editPdf/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error editing pdf:', error);
    throw error;
  }
}
async function addPdf(data) {
  try {
    const response = await axios.post(`${API_URL}/pdfs/addPdf`, data);
    return response.data;
  } catch (error) {
    console.error('Error adding pdf:', error);
    throw error;
  }
}

async function deletePdf(id) {
    try {
        const response = await axios.delete(`${API_URL}/pdfs/deletePdf/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting pdf:', error);
        throw error;
    }
}



export default pdfService;