import mongoose from 'mongoose';

const screeningHistorySchema = new mongoose.Schema({
  donor_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Donor', required: true },
  screening_date: { type: Date, default: Date.now },
  is_eligible: { type: Boolean, required: true },
  responses: { type: mongoose.Schema.Types.Mixed },
  ineligible_reasons: [{ type: String }],
  next_eligible_date: { type: Date },
  created_at: { type: Date, default: Date.now }
}, { timestamps: true });

export const ScreeningHistory = mongoose.model('ScreeningHistory', screeningHistorySchema);
