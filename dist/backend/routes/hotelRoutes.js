"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const dataHandler_1 = require("../utils/dataHandler");
const slugMiddleware_1 = require("../middleware/slugMiddleware");
const router = express_1.default.Router();
router.use(express_1.default.json());
router.get('/hotels', async (_, res) => {
    try {
        const hotels = await (0, dataHandler_1.getAllHotels)();
        res.json(hotels);
    }
    catch (error) {
        console.error('Error retrieving hotels:', error);
        res.status(500).send("Failed to retrieve hotels.");
    }
});
router.post('/hotel', slugMiddleware_1.generateSlug, async (req, res) => {
    const newHotel = Object.assign(Object.assign({}, req.body), { id: Date.now().toString() }); // Ensure ID is unique
    try {
        await (0, dataHandler_1.saveOrUpdateHotel)(newHotel);
        res.status(201).json(newHotel);
    }
    catch (error) {
        console.error('Error adding hotel:', error);
        res.status(500).send("Failed to add hotel.");
    }
});
router.get('/hotel/:id', async (req, res) => {
    try {
        const hotel = await (0, dataHandler_1.getHotelById)(req.params.id);
        if (!hotel) {
            res.status(404).send("Hotel not found");
        }
        else {
            res.json(hotel);
        }
    }
    catch (error) {
        console.error('Error retrieving hotel:', error);
        res.status(500).send("Failed to retrieve hotel.");
    }
});
router.put('/hotel/:id', slugMiddleware_1.generateSlug, async (req, res) => {
    try {
        const existingHotel = await (0, dataHandler_1.getHotelById)(req.params.id);
        if (!existingHotel) {
            res.status(404).send("Hotel not found");
            return;
        }
        const updatedHotel = Object.assign(Object.assign(Object.assign({}, existingHotel), req.body), { id: req.params.id });
        await (0, dataHandler_1.saveOrUpdateHotel)(updatedHotel);
        res.status(200).json(updatedHotel);
    }
    catch (error) {
        console.error('Error updating hotel:', error);
        res.status(500).send("Failed to update hotel.");
    }
});
// Configure multer storage
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path_1.default.join(__dirname, '../data/images'));
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
        cb(null, `${uniqueSuffix}-${file.originalname}`);
    }
});
const upload = (0, multer_1.default)({ storage });
router.post('/hotel/:id/images', upload.array('images', 10), async (req, res) => {
    try {
        const hotelId = req.params.id;
        const hotel = await (0, dataHandler_1.getHotelById)(hotelId);
        if (!hotel) {
            res.status(404).send('Hotel not found');
            return;
        }
        if (!req.files || req.files.length === 0) {
            res.status(400).send('No images were uploaded.');
            return;
        }
        const uploadedFiles = req.files.map(file => `/data/images/${file.filename}`);
        hotel.images = hotel.images ? [...hotel.images, ...uploadedFiles] : uploadedFiles;
        await (0, dataHandler_1.saveOrUpdateHotel)(hotel);
        res.status(200).json({ message: 'Images uploaded successfully', images: uploadedFiles });
    }
    catch (error) {
        console.error('Error uploading images:', error);
        res.status(500).send('Failed to upload images');
    }
});
// Route to add a new room to a hotel
router.post('/hotel/:id/rooms', slugMiddleware_1.generateRoomSlug, async (req, res) => {
    try {
        const hotelId = req.params.id;
        const newRoom = req.body;
        const hotel = await (0, dataHandler_1.getHotelById)(hotelId);
        if (!hotel) {
            res.status(404).send('Hotel not found');
            return;
        }
        hotel.rooms = hotel.rooms ? [...hotel.rooms, newRoom] : [newRoom];
        await (0, dataHandler_1.saveOrUpdateHotel)(hotel);
        res.status(201).json({ message: 'Room added successfully', room: newRoom });
    }
    catch (error) {
        console.error('Error adding room:', error);
        res.status(500).send('Failed to add room.');
    }
});
exports.default = router;
