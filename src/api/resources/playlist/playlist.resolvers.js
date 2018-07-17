import { merge } from 'lodash';

import { Playlist } from './playlist.model';

// find all playlists
const allPlaylists = () => {
	return Playlist.find({}).exec();
};

// get playlist by its id
const getPlaylist = async (root, { id }) => {
	const playlist = await Playlist.findById(id).exec();

	if (!playlist) {
		throw new Error('No playlist exists with provided id');
	}

	return playlist;
};

// populate songs in playlist
const songsArray = async (playlist, args, context, info) => {
	const populated = await playlist.populate('songs').execPopulate();
	return populated.songs;
};

// create new playlist
const createPlaylist = async (root, { input }, context, info) => {
	return await Playlist.create(input);
};

// update playlist
// TODO: Handle updates for songs array
const updatePlaylist = async (root, { input }, context, info) => {
	const { id, ...update } = input;
	return Playlist.findByIdAndUpdate(id, { $set: update }, { new: true }).exec();
};

// delte playlist
const deletePlaylist = async (root, { id }, context, info) => {
	return await Playlist.findByIdAndRemove(id).exec();
};

export const playlistResolvers = {
	Query: {
		allPlaylists,
		getPlaylist,
	},
	Mutation: {
		createPlaylist,
		updatePlaylist,
		deletePlaylist,
	},
	// Below is an example on how to implement a nested resolver
	Playlist: {
		songs: songsArray,
	},
};
