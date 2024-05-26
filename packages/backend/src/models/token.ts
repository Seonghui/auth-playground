import mongoose, { Document, Schema } from 'mongoose';

interface IToken extends Document {
  token: string;
}

const TokenSchema = new Schema({
  token: { type: String, required: true },
});

const Token = mongoose.model<IToken>('Token', TokenSchema);

export default Token;
