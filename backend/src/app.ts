import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import donorsRouter from './routes/donors';
import donationsRouter from './routes/donations';
import donorDonationsRouter from './routes/donorDonations';
import bloodBanksRouter from './routes/bloodBanks';
import hospitalsRouter from './routes/hospitals';
import donationCampsRouter from './routes/donationCamps';
import screeningRouter from './routes/screening';
import adminRouter from './routes/admin';
import jwt from 'jsonwebtoken';
import { logUserActivity } from './mongo';

const app = express();

// Security middleware
app.use(helmet());

// CORS middleware - allow multiple origins
const allowedOrigins = [
  'http://localhost:3000',
  'https://blood-donation-ecru-chi.vercel.app',
  'https://blood-donation-management-system.vercel.app',
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ─── Visit tracking middleware ────────────────────────────────────────────────
app.use('/api', (req, _res, next) => {
  const skip = ['/health', '/visits', '/stats'];
  if (skip.some(s => req.path.startsWith(s))) { next(); return; }

  // Extract donor_id from JWT if present
  let donorId: string | null = null;
  const auth = req.headers.authorization;
  if (auth?.startsWith('Bearer ')) {
    try {
      const secret = process.env.JWT_SECRET || 'dev-jwt-secret-change-in-production';
      const payload = jwt.verify(auth.slice(7), secret) as { id?: string };
      donorId = payload.id ?? null;
    } catch { /* ignore invalid tokens */ }
  }

  const ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() || req.socket.remoteAddress || null;
  const userAgent = req.headers['user-agent'] || null;
  const path = req.path;

  // Log to MongoDB
  logUserActivity({
    event: 'api_visit',
    email: 'anonymous',
    donor_id: donorId || undefined,
    ip_address: ip || undefined
  }).catch(err => console.error('Visit tracking error:', err));

  next();
});

// Donor routes
app.use('/api/donors', donorsRouter);

// Donation routes
app.use('/api/donations', donationsRouter);

// Donor donation history & next-eligible-date routes
app.use('/api/donors/:id/donations', donorDonationsRouter);

// Blood bank routes
app.use('/api/blood-banks', bloodBanksRouter);

// Hospital routes
app.use('/api/hospitals', hospitalsRouter);

// Donation camps routes
app.use('/api/donation-camps', donationCampsRouter);

// Screening routes
app.use('/api/donors', screeningRouter);

// Admin routes
app.use('/api/admin', adminRouter);

// Stats endpoint for home page
app.get('/api/stats', async (_req, res) => {
  try {
    const { Donor, DonationRecord, BloodBank, DonationCamp } = await import('./mongo');
    
    const [donors, donations, banks, camps] = await Promise.all([
      Donor.countDocuments(),
      DonationRecord.countDocuments(),
      BloodBank.countDocuments(),
      DonationCamp.countDocuments({ camp_date: { $gte: new Date() } })
    ]);
    
    res.json({
      totalDonors: donors,
      totalDonations: donations,
      totalBloodBanks: banks,
      totalCamps: camps,
    });
  } catch (err) {
    console.error('Stats error:', err);
    res.json({ totalDonors: 0, totalDonations: 0, totalBloodBanks: 0, totalCamps: 0 });
  }
});

// Visits endpoint
app.get('/api/visits', async (_req, res) => {
  try {
    const { UserActivity } = await import('./mongo');
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const [total, todayVisits] = await Promise.all([
      UserActivity.countDocuments(),
      UserActivity.countDocuments({ timestamp: { $gte: today } })
    ]);
    
    res.json({
      totalVisits: total,
      todayVisits: todayVisits,
      topPaths: [],
      dailyVisits: []
    });
  } catch (err) {
    console.error('Visit stats error:', err);
    res.status(500).json({ error: 'Failed to fetch visit stats' });
  }
});

export default app;
