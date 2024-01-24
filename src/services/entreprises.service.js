import axios from 'axios';

const API_URL = import.meta.env.VITE_APP_API_URL;

 const entrepriseService = {
    getEntreprises,
    getEntreprise,
    addEntreprise,
    updateEntreprise
};

//récupérer la liste de tous les utilisateurs
async function getEntreprises() {
  try {
    const response = await axios.get(`${API_URL}/entreprises/getEntreprises`);
    return response.data;
  } catch (error) {
    console.error('Error getting Entreprises:', error);
    throw error;
  }
}
//récupérer un utilisateur
async function getEntreprise(entreprise_id) {
  try {
    const response = await axios.get(`${API_URL}/entreprises/getEntreprise/${entreprise_id}`);
    return response.data;
  } catch (error) {
    console.error('Error getting Entreprise:', error);
    throw error;
  }
}

//Ajouter un utilisateur
async function addEntreprise(entreprise) {
    console.log('entreprise', entreprise);
  try {
    const response = await axios.post(`${API_URL}/entreprises/addEntreprise`, entreprise);
    return response.data;
  } catch (error) {
    console.error('Error posting entreprise:', error);
    throw error;
  }
}

async function updateEntreprise(id, entreprise) {
  try {
    const response = await axios.put(`${API_URL}/entreprises/updateEntreprise/${id}`, entreprise);
    return response.data;
  } catch (error) {
    console.error('Error updating entreprise:', error);
    throw error;
  }
}

export default entrepriseService;