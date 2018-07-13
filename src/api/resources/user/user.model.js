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

const userSchema = new mongoose.Schema(schema, { timestamps: true });

export const User = mongoose.model('User', userSchema);
