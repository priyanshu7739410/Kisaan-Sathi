import mongoose, { Schema, Document } from 'mongoose';

export interface ILocalizedTranslation extends Document {
  entity_type: string; // e.g. 'crop', 'disease', 'task'
  entity_id: mongoose.Types.ObjectId;
  field_name: string;
  language_code: string;
  translated_value: string;
}

const LocalizedTranslationSchema: Schema = new Schema({
  entity_type: { type: String, required: true },
  entity_id: { type: Schema.Types.ObjectId, required: true },
  field_name: { type: String, required: true },
  language_code: { type: String, required: true },
  translated_value: { type: String, required: true },
});

export default mongoose.model<ILocalizedTranslation>('LocalizedTranslation', LocalizedTranslationSchema);
