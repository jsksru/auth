import mongoose from 'mongoose';
import { v4 as uuid } from 'uuid';

const { Schema, model, Types } = mongoose;

export default model('Token', new Schema({
  userId: {
    type:  Types.ObjectId,
    required: true,
    index: true,
  },
  refresh: {
    type: String,
    required: true,
    default: uuid(),
    index: true,
  },
  userAgent: String,
  ipAddress: String,
  lastUpdate: {
    type: Number,
    default: Date.now(),
  },
  blocked: {
    type: Boolean,
    default: false
  }
}));