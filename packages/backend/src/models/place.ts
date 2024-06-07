import mongoose, { Document, Schema } from 'mongoose';

export interface IPlace extends Document {
  title: string;
  description: string;
  image: string;
  address: string;
  location: {
    lat: number;
    lng: number;
  };
  creator: string;
}

const placeSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  image: { type: String },
  address: { type: String, required: true },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
});

const Place = mongoose.model<IPlace>('Place', placeSchema);

export default Place;
