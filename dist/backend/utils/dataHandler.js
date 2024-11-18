"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHotelById = getHotelById;
exports.saveOrUpdateHotel = saveOrUpdateHotel;
exports.getAllHotels = getAllHotels;
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
// Define the directory where hotel data is stored
const hotelsDirectory = path_1.default.resolve(__dirname, '../data/hotels');
// Type guard to check for NodeJS.ErrnoException
function isNodeError(error) {
    return error instanceof Error && 'code' in error;
}
// Reads a hotel file and returns the Hotel object
async function readHotelFile(id) {
    const filePath = path_1.default.join(hotelsDirectory, `${id}.json`);
    const data = await promises_1.default.readFile(filePath, 'utf8');
    return JSON.parse(data);
}
// Writes or updates a hotel file with new data
async function writeHotelFile(hotel) {
    const filePath = path_1.default.join(hotelsDirectory, `${hotel.id}.json`);
    await promises_1.default.writeFile(filePath, JSON.stringify(hotel, null, 2), 'utf8');
}
// Gets a single hotel by ID, returns null if the file does not exist
async function getHotelById(id) {
    try {
        return await readHotelFile(id);
    }
    catch (error) {
        if (isNodeError(error) && error.code === 'ENOENT') {
            return null; // File does not exist
        }
        throw error; // Rethrow any other type of error
    }
}
// Saves a new hotel or updates an existing one
async function saveOrUpdateHotel(hotel) {
    await writeHotelFile(hotel);
}
// Retrieves all hotels from the directory
async function getAllHotels() {
    const files = await promises_1.default.readdir(hotelsDirectory);
    return Promise.all(files.map(file => readHotelFile(file.replace('.json', ''))));
}
