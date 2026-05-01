import mongoose from 'mongoose';

const donorSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  password_hash: { type: String },
  full_name: { type: String, required: true },
  phone_number: { type: String },
  blood_group: { type: String, enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] },
  date_of_birth: { type: Date },
  gender: { type: String, enum: ['Male', 'Female', 'Other'] },
  location_city: { type: String },
  location_state: { type: String },
  location_pincode: { type: String },
  is_available: { type: Boolean, default: true },
  last_donation_date: { type: Date },
  total_donations: { type: Number, default: 0 },
  reward_points: { type: Number, default: 0 },
  google_id: { type: String, unique: true, sparse: true },
  reset_token: { type: String },
  reset_token_expires: { type: Date },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
}, { timestamps: true });

export const Donor = mongoose.model('Donor', donorSchema);
