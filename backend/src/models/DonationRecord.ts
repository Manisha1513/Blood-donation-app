import mongoose from 'mongoose';

const donationRecordSchema = new mongoose.Schema({
  donor_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Donor', required: true },
  blood_bank_id: { type: mongoose.Schema.Types.ObjectId, ref: 'BloodBank' },
  donation_date: { type: Date, required: true },
  blood_group: { type: String, required: true },
  quantity_ml: { type: Number, default: 350 },
  donation_type: { type: String, enum: ['Whole Blood', 'Plasma', 'Platelets'], default: 'Whole Blood' },
  status: { type: String, enum: ['Completed', 'Pending', 'Cancelled'], default: 'Completed' },
  notes: { type: String },
  created_at: { type: Date, default: Date.now }
}, { timestamps: true });

export const DonationRecord = mongoose.model('DonationRecord', donationRecordSchema);
