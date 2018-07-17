import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

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
	playlists: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Playlist',
		},
	],
};

const userSchema = new mongoose.Schema(schema, { timestamps: true });

userSchema.methods = {
	authenticate(plainTextPassword) {
		bcrypt.compareSync(plainTextPassword, this.password);
	},
	hashPassword(plainTextPassword) {
		if (!plainTextPassword) {
			throw new Error('Could not save user');
		}

		const salt = bcrypt.genSaltSync(10);
		return bcrypt.hashSync(plainTextPassword, salt);
	},
};

export const User = mongoose.model('User', userSchema);
