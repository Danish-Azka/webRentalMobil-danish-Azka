import axios from 'axios';

export const postAdmin = async (adminData) => {
    try {
        const response = await axios.post('http://localhost:3009/admin/post', adminData);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error posting user data');
    }
};

export const getAdmin = async () => {
    try {
        const response = await axios.get('http://localhost:3009/admin/get');
        return response.data; // Assuming the response contains an array of users
    } catch (error) {
        console.error("Error fetching admin", error);
        throw new Error('Failed to fetch admin');
    }
};

