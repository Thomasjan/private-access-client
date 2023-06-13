import axios from 'axios';

const API_URL = import.meta.env.VITE_APP_API_URL;

 const formationService = {
    getFormations,
    editFormation,
    addFormation,
    deleteFormation
    
};
//Pdfs de la page Suppport
async function getFormations() {
  try {
    const response = await axios.get(`${API_URL}/formations/getFormations`);
    return response.data;
  } catch (error) {
    console.error('Error getting formations:', error);
    throw error;
  }
}

async function editFormation(id, data) {
  try {
    const response = await axios.put(`${API_URL}/formations/editFormation/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error editing formation:', error);
    throw error;
  }
}
async function addFormation(data) {
  try {
    const response = await axios.post(`${API_URL}/formations/addFormation`, data);
    return response.data;
  } catch (error) {
    console.error('Error adding formation:', error);
    throw error;
  }
}

async function deleteFormation(id) {
    try {
        const response = await axios.delete(`${API_URL}/formations/deleteFormation/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting formation:', error);
        throw error;
    }
}


export default formationService;