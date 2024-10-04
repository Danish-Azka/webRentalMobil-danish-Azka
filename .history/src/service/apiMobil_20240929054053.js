
import axios from 'axios';

export const getMobil = async () => {
  try {
    const response = await axios.get('http://localhost:3009/mobil/get');
    return response.data;
  } catch (error) {
    console.error('Error fetching Mobils:', error);
    return [];
  }
};

const API_URL = 'http://localhost:3009/mobil/post';

export const createMobil = async (MobilData) => {
  try {
    const response = await axios.post(API_URL, MobilData);
    return response.data;
  } catch (error) {
    console.error('Error creating Mobil:', error);
    throw error;
  }
};

export const deleteMobil = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:3009/mobil/delete/${id}`);
      return response.data
  } catch (error){
    console.error("error deleting Employe", error);
    throw(error);
  }
};

export const getMobilById = async (id) => {
  try {
    const response = await axios.get(`http://localhost:3009/mobil/get/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching mobilByID:", error);
    throw error;
  }
};

export const editMobil = async (id, updatedData) => {
  try {
    const response = await axios.put(`http://localhost:3009/mobil/update/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error("Error updating mobil:", error);
    throw error;
  }
};