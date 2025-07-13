import axios from 'axios';

const API_URL = 'http://3.228.51.209:5000'; // Adjust the base URL as needed

export const submitUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/submit`, userData);
        return response.data;
    } catch (error) {
        throw new Error('Error submitting user data: ' + error.message);
    }
};

export const fetchUsers = async () => {
    try {
        const response = await axios.get(`${API_URL}/view`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching users: ' + error.message);
    }
};
