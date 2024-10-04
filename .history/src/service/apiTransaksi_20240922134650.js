
import axios from 'axios';

export const getTransaksi = async () => {
  try {
    const response = await axios.get('http://localhost:3009/transaksi/get');
    return response.data;
  } catch (error) {
    console.error('Error fetching Transaksis:', error);
    return [];
  }
};

const API_URL = 'http://localhost:3009/transaksi/post';

export const createTransaksi = async (TransaksiData) => {
  try {
    const response = await axios.post(API_URL, TransaksiData);
    return response.data;
  } catch (error) {
    console.error('Error creating Transaksi:', error);
    throw error;
  }
};

export const deleteTransaksi = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:3009/transaksi/delete/${id}`);
      return response.data
  } catch (error){
    console.error("error deleting Transaksi", error);
    throw(error);
  }
};

export const getTransaksiById = async (id) => {
  try {
    const response = await axios.get(`http://localhost:3009/transaksi/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching transaksi:", error);
    throw error;
  }
};

export const editTransaksi = async (id, updatedData) => {
  try {
    const response = await axios.put(`http://localhost:3009/transaksi/update/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error("Error updating transaksi:", error);
    throw error;
  }
};