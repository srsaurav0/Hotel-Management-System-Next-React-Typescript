"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHotelById = exports.getHotels = void 0;
// /services/hotelService.ts
const axios_1 = __importDefault(require("axios"));
const getHotels = async () => {
    try {
        const response = await axios_1.default.get('http://localhost:3000/api/hotels');
        return response.data;
    }
    catch (error) {
        console.error('Error fetching hotels:', error);
        throw error;
    }
};
exports.getHotels = getHotels;
const getHotelById = async (id) => {
    try {
        const response = await axios_1.default.get(`http://localhost:3000/api/hotel/${id}`);
        return response.data;
    }
    catch (error) {
        console.error(`Error fetching hotel with ID ${id}:`, error);
        throw error;
    }
};
exports.getHotelById = getHotelById;
