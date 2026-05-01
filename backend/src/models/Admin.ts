import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  password_hash: { type: String, required: true },
  full_name: { type: String, required: true },
  role: { type: String, enum: ['super_admin', 'admin', 'moderator'], default: 'admin' },
  is_active: { type: Boolean, default: true },
  created_at: { type: Date, default: Date.now }
}, { timestamps: true });

export const Admin = mongoose.model('Admin', adminSchema);
