import mongoose from 'mongoose';

const schema = {
	title: {
		type: String,
		required: [true, 'Song must have a title'],
	},
	url: {
		type: String,
		unique: true,
		required: [true, 'Song must have an url'],
	},
	album: String,
	artist: String,
};

const songSchema = new mongoose.Schema(schema);

export const Song = mongoose.model('song', songSchema);
