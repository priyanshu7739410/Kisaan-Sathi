import mongoose, { Schema, Document } from 'mongoose';

export interface ICropCycle extends Document {
  farm_id: mongoose.Types.ObjectId;
  crop_type: string;
  sowing_date: Date;
  stage: string;
}

const CropCycleSchema: Schema = new Schema({
  farm_id: { type: Schema.Types.ObjectId, ref: 'Farm', required: true },
  crop_type: { type: String, required: true },
  sowing_date: { type: Date, required: true },
  stage: { 
    type: String, 
    enum: ['sowing', 'vegetative', 'flowering', 'harvest'], 
    required: true 
  },
});

export default mongoose.model<ICropCycle>('CropCycle', CropCycleSchema);
