import mongoose from 'mongoose';

const { Schema, model } = mongoose;

export default model('User', new Schema({
  username: {
    type: String,
    min: 3,
    max: 20,
    unique: true,
    index: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
}));