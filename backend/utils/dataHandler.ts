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
    try {
        const data = await fs.readFile(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        if (isNodeError(error) && error.code === 'ENOENT') {
            throw error; // Keep the file-not-found behavior as is
        } else if (error instanceof SyntaxError) {
            console.error(`Error parsing JSON for file: ${filePath}`, error);
            throw new Error(`Corrupted data in hotel file: ${filePath}`);
        }
        throw error; // Rethrow any other type of error
    }
}

// Writes or updates a hotel file with new data
async function writeHotelFile(hotel: Hotel): Promise<void> {
    const filePath = path.join(hotelsDirectory, `${hotel.id}.json`);
    try {
        await fs.writeFile(filePath, JSON.stringify(hotel, null, 2), 'utf8');
    } catch (error) {
        console.error(`Error writing hotel data to file: ${filePath}`, error);
        throw new Error(`Failed to write hotel data to file: ${filePath}`);
    }
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
    try {
        const files = await fs.readdir(hotelsDirectory);
        return Promise.all(
            files.map(async file => {
                try {
                    return await readHotelFile(file.replace('.json', ''));
                } catch (error) {
                    console.error(`Skipping invalid or corrupt file: ${file}`, error);
                    return null; // Skip invalid/corrupt files
                }
            })
        ).then(hotels => hotels.filter((hotel): hotel is Hotel => hotel !== null)); // Filter out null values
    } catch (error) {
        console.error('Error reading hotels directory:', error);
        throw new Error('Failed to retrieve hotels');
    }
}
