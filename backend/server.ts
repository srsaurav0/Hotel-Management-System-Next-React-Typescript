import express from 'express';
import hotelRoutes from './routes/hotelRoutes'; // Adjust the import path as needed

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Use the routes
app.use('/hotel', hotelRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
