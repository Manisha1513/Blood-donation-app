import mongoose from 'mongoose';

// ─── Export Models ────────────────────────────────────────────────────────────
export { Donor } from './models/Donor';
export { BloodBank } from './models/BloodBank';
export { Hospital } from './models/Hospital';
export { DonationCamp } from './models/DonationCamp';
export { DonationRecord } from './models/DonationRecord';
export { ScreeningHistory } from './models/ScreeningHistory';
export { Admin } from './models/Admin';

// ─── User Activity Schema (for logging) ──────────────────────────────────────
const userActivitySchema = new mongoose.Schema({
  event: { type: String, required: true },
  donor_id: String,
  full_name: String,
  email: { type: String, required: true },
  blood_group: String,
  gender: String,
  location_city: String,
  ip_address: String,
  timestamp: { type: Date, default: Date.now },
});

export const UserActivity = mongoose.model('UserActivity', userActivitySchema);

// ─── Connect ──────────────────────────────────────────────────────────────────
export async function connectMongo(): Promise<void> {
  const url = process.env.MONGODB_URL;
  if (!url) {
    console.log('[MongoDB] MONGODB_URL not set, skipping connection.');
    return;
  }
  try {
    await mongoose.connect(url);
    console.log('[MongoDB] Connected to', url);
  } catch (err) {
    console.error('[MongoDB] Connection failed:', err);
    throw err; // Throw error since MongoDB is now the primary database
  }
}

// ─── Log helpers ─────────────────────────────────────────────────────────────
export async function logUserActivity(data: {
  event: string;
  donor_id?: string;
  full_name?: string;
  email: string;
  blood_group?: string;
  gender?: string;
  location_city?: string;
  ip_address?: string;
}): Promise<void> {
  try {
    if (mongoose.connection.readyState !== 1) return;
    await UserActivity.create(data);
  } catch (err) {
    console.error('[MongoDB] Log error:', err);
  }
}
