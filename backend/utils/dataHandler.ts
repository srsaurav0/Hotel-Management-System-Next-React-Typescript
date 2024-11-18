import fs from 'fs/promises';
import path from 'path';
import { Hotel } from '../../types/types';  // Ensure this type is correct and the path is accurate

// Define the directory where hotel data is stored
const hotelsDirectory = path.resolve(__dirname, '../data/hotels');

// Type guard to check for NodeJS.ErrnoException
function isNodeError(error: any): error is NodeJS.ErrnoException {
    return error instanceof Error && 'code' in error;
}

// Reads a hotel file and returns the Hotel object
async function readHotelFile(id: string): Promise<Hotel> {
    const filePath = path.join(hotelsDirectory, `${id}.json`);
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
}

// Writes or updates a hotel file with new data
async function writeHotelFile(hotel: Hotel): Promise<void> {
    const filePath = path.join(hotelsDirectory, `${hotel.id}.json`);
    await fs.writeFile(filePath, JSON.stringify(hotel, null, 2), 'utf8');
}

// Gets a single hotel by ID, returns null if the file does not exist
export async function getHotelById(id: string): Promise<Hotel | null> {
    try {
        return await readHotelFile(id);
    } catch (error: unknown) {
        if (isNodeError(error) && error.code === 'ENOENT') {
            return null; // File does not exist
        }
        throw error; // Rethrow any other type of error
    }
}

// Saves a new hotel or updates an existing one
export async function saveOrUpdateHotel(hotel: Hotel): Promise<void> {
    await writeHotelFile(hotel);
}

// Retrieves all hotels from the directory
export async function getAllHotels(): Promise<Hotel[]> {
    const files = await fs.readdir(hotelsDirectory);
    return Promise.all(files.map(file => readHotelFile(file.replace('.json', ''))));
}
