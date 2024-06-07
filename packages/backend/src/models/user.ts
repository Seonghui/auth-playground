import mongoose, { Document, Schema } from 'mongoose';
import { IPlace } from './place';

interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  places: IPlace[];
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  places: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Place' }],
});

const User = mongoose.model<IUser>('User', UserSchema);

export default User;
