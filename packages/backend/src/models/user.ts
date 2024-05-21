import mongoose, { Document, Schema } from 'mongoose';

// 사용자 인터페이스 정의
interface IUser extends Document {
  username: string;
  email: string;
  password: string;
}

// 사용자 스키마 정의
const UserSchema: Schema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// 사용자 모델 생성
const User = mongoose.model<IUser>('User', UserSchema);

export default User;
