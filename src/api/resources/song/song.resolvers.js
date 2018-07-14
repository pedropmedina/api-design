import { Song } from './song.model';

const getSong = async (root, { id }) => {
	const song = await Song.findById(id).exec();

	if (!song) {
		throw new Error('Cannot find song with provided id');
	}

	return song;
};

const allSongs = () => {
	return Song.find({}).exec();
};

export const songResolvers = {
	Query: {
		getSong,
		allSongs,
	},
};
