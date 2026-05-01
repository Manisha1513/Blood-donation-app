import dotenv from 'dotenv';
dotenv.config();

import { connectMongo } from './mongo';
import app from './app';
import { startReminderCron } from './services/notificationService';

const PORT = process.env.PORT || 3001;

async function start(): Promise<void> {
  try {
    // Connect to MongoDB first
    await connectMongo();
    console.log('MongoDB connected successfully.');
    
    // Start server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
    
    // Start cron jobs
    startReminderCron();
    console.log('All services initialized.');
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

void start();
