import mongoose from 'mongoose';

const schema = {
	username: {
		type: String,
		unique: true,
		required: true,
	},
	passwordHash: {
		required: true,
		type: String,
	},
};

const userSchema = new mongoose.Schema(schema);

export const User = mongoose.model('user', userSchema);
