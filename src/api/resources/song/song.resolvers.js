import { merge } from 'lodash';

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

const createSong = async (root, { input }, context, info) => {
	const song = await Song.create(input);
	return song;
};

const updateSong = async (root, { input }, context, info) => {
	const updatedSong = await Song.findByIdAndUpdate(
		input.id,
		{ $set: input },
		{ new: true },
	);
	return updatedSong;
};

const deleteSong = async (root, { id }, context, info) => {
	const song = await Song.findByIdAndRemove(id);
	return song;
};

export const songResolvers = {
	Query: {
		getSong,
		allSongs,
	},
	Mutation: {
		createSong,
		updateSong,
		deleteSong,
	},
};
