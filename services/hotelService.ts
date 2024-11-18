// /services/hotelService.ts
import axios from 'axios';

export const getHotels = async () => {
    try {
        const response = await axios.get('http://localhost:3000/api/hotels');
        return response.data;
    } catch (error) {
        console.error('Error fetching hotels:', error);
        throw error;
    }
};

export const getHotelById = async (id: string) => {
    try {
        const response = await axios.get(`http://localhost:3000/api/hotel/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching hotel with ID ${id}:`, error);
        throw error;
    }
};
