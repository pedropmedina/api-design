import mongoose from 'mongoose';

const schema = {};

const userSchema = new mongoose.Schema(schema);

export const User = mongoose.model('user', userSchema);
