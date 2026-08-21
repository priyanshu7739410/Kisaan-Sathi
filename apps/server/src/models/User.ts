import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  phone_number: string;
  role: string;
  registered_at: Date;
}

const UserSchema: Schema = new Schema({
  phone_number: { type: String, required: true, unique: true },
  role: { type: String, required: true, default: 'farmer' },
  registered_at: { type: Date, default: Date.now },
});

export default mongoose.model<IUser>('User', UserSchema);
