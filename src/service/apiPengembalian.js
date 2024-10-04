
import axios from 'axios';

export const getPengembalian = async () => {
  try {
    const response = await axios.get('http://localhost:3009/pengembalian/get');
    return response.data;
  } catch (error) {
    console.error('Error fetching Pengembalians:', error);
    return [];
  }
};

const API_URL = 'http://localhost:3009/pengembalian/post';

export const createPengembalian = async (PengembalianData) => {
  try {
    const response = await axios.post(API_URL, PengembalianData);
    return response.data;
  } catch (error) {
    console.error('Error creating Pengembalian:', error);
    throw error;
  }
};

export const deletePengembalian = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:3009/pengembalian/delete/${id}`);
      return response.data
  } catch (error){
    console.error("error deleting pengembalian", error);
    throw(error);
  }
};

export const getPengembalianById = async (id) => {
  try {
    const response = await axios.get(`http://localhost:3009/pengembalian/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching pengembalian:", error);
    throw error;
  }
};

export const editPengembalian = async (id, updatedData) => {
  try {
    const response = await axios.put(`http://localhost:3009/pengembalian/update/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error("Error updating pengembalian:", error);
    throw error;
  }
};
