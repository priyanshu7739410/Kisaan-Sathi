import mongoose, { Schema, Document } from 'mongoose';

export interface IFarm extends Document {
  user_id: mongoose.Types.ObjectId;
  name: string;
  soil_type: string;
  water_source: string;
  gps_location: {
    type: string;
    coordinates: number[]; // [longitude, latitude]
  };
}

const FarmSchema: Schema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  soil_type: { type: String, required: true },
  water_source: { type: String, required: true },
  gps_location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  }
});

// Create a 2dsphere index on the gps_location field
FarmSchema.index({ gps_location: '2dsphere' });

export default mongoose.model<IFarm>('Farm', FarmSchema);
