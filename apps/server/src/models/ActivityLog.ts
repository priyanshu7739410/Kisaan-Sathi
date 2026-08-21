import mongoose, { Schema, Document } from 'mongoose';

export interface IActivityLog extends Document {
  crop_cycle_id: mongoose.Types.ObjectId;
  activity_type: string;
  details: any;
  logged_at: Date;
}

const ActivityLogSchema: Schema = new Schema({
  crop_cycle_id: { type: Schema.Types.ObjectId, ref: 'CropCycle', required: true },
  activity_type: { type: String, required: true },
  details: { type: Schema.Types.Mixed }, // Mixed JSON
  logged_at: { type: Date, default: Date.now },
});

export default mongoose.model<IActivityLog>('ActivityLog', ActivityLogSchema);
