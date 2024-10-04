
import axios from 'axios';

export const getKaryawan = async () => {
  try {
    const response = await axios.get('http://localhost:3009/karyawan/get');
    return response.data;
  } catch (error) {
    console.error('Error fetching Karyawans:', error);
    return [];
  }
};

const API_URL = 'http://localhost:3009/karyawan/post';

export const createKaryawan = async (KaryawanData) => {
  try {
    const response = await axios.post(API_URL, KaryawanData);
    return response.data;
  } catch (error) {
    console.error('Error creating Karyawan:', error);
    throw error;
  }
};

export const deleteKaryawan = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:3009/karyawan/delete/${id}`);
      return response.data
  } catch (error){
    console.error("error deleting Employe", error);
    throw(error);
  }
};

export const getKaryawanById = async (id) => {
  try {
    const response = await axios.get(`http://localhost:3009/karyawan/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching client:", error);
    throw error;
  }
};

export const editKaryawan = async (id, updatedData) => {
  try {
    const response = await axios.put(`http://localhost:3009/karyawan/update/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error("Error updating Karyawan:", error);
    throw error;
  }
};