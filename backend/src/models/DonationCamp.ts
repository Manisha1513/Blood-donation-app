import mongoose from 'mongoose';

const donationCampSchema = new mongoose.Schema({
  name: { type: String, required: true },
  organizer: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  pincode: { type: String, required: true },
  camp_date: { type: Date, required: true },
  start_time: { type: String, required: true },
  end_time: { type: String, required: true },
  contact_person: { type: String },
  contact_phone: { type: String },
  latitude: { type: Number },
  longitude: { type: Number },
  description: { type: String },
  expected_donors: { type: Number, default: 0 },
  registered_donors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Donor' }],
  created_at: { type: Date, default: Date.now }
}, { timestamps: true });

export const DonationCamp = mongoose.model('DonationCamp', donationCampSchema);
