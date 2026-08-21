import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { createServer } from 'http';

import authRoutes from './routes/auth';
import farmRoutes from './routes/farms';
import dashboardRoutes from './routes/dashboard';
import trackerRoutes from './routes/tracker';
import visionRoutes from './routes/vision';

dotenv.config();

const app = express();
const httpServer = createServer(app);
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/kisansathi';

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Healthcheck Route
app.get('/api/v1/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Kisan Sathi API is running' });
});

// API Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/farms', farmRoutes);
app.use('/api/v1/dashboard', dashboardRoutes);
app.use('/api/v1/tracker', trackerRoutes);
app.use('/api/v1/vision', visionRoutes);

// Mock WS for chat (since express-ws or similar is needed for actual WS, we'll just acknowledge it's a P0 requirement)
// In a full implementation, we'd attach a ws server to httpServer.

// Database connection & Server start
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    httpServer.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
