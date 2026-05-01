import mongoose from 'mongoose';

const hospitalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  pincode: { type: String, required: true },
  phone_number: { type: String, required: true },
  email: { type: String },
  latitude: { type: Number },
  longitude: { type: Number },
  emergency_contact: { type: String },
  blood_requirements: {
    'A+': { type: Number, default: 0 },
    'A-': { type: Number, default: 0 },
    'B+': { type: Number, default: 0 },
    'B-': { type: Number, default: 0 },
    'AB+': { type: Number, default: 0 },
    'AB-': { type: Number, default: 0 },
    'O+': { type: Number, default: 0 },
    'O-': { type: Number, default: 0 }
  },
  created_at: { type: Date, default: Date.now }
}, { timestamps: true });

export const Hospital = mongoose.model('Hospital', hospitalSchema);
