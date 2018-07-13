import mongoose from 'mongoose';

const schema = {
	title: {
		type: String,
		required: [true, 'Playlist must have a title'],
	},
	songs: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'song',
		},
	],
	favorite: {
		type: Boolean,
		required: true,
		default: false,
	},
};

const playlistSchema = new mongoose.Schema(schema);

export const Playlist = mongoose.model('Playlist', playlistSchema);
