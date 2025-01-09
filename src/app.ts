import express from 'express';
import cors from 'cors';
import dbInit from './db/init';
import routes from './routes/index';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();
const port = process.env.PORT || 5000;

// Basic middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Initialize database
dbInit();

// Routes
app.use('/api/v1', routes);

// Health check endpoint
app.get('/health', (_req, res) => {
    res.json({ status: 'ok' });
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
