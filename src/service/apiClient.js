
import axios from 'axios';

export const getClients = async () => {
  try {
    const response = await axios.get('http://localhost:3009/client/get');
    return response.data;
  } catch (error) {
    console.error('Error fetching clients:', error);
    return [];
  }
};

const API_URL = 'http://localhost:3009/client/post';

export const createClient = async (clientData) => {
  try {
    const response = await axios.post(API_URL, clientData);
    return response.data;
  } catch (error) {
    console.error('Error creating client:', error);
    throw error;
  }
};

export const deleteClient = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:3009/client/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting client:", error);
    throw error;
  }
};

export const getClientById = async (id) => {
  try {
    const response = await axios.get(`http://localhost:3009/client/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching client:", error);
    throw error;
  }
};

export const editClient = async (id, updatedData) => {
  try {
    const response = await axios.put(`http://localhost:3009/client/update/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error("Error updating client:", error);
    throw error;
  }
};