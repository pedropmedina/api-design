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
const songsInPlaylist = async (root, args, context, info) => {
	const listOfsongs = await Playlist.findById(root.id)
		.populate('songs')
		.select('songs')
		.exec();

	return listOfsongs.songs;
};

// create new playlist
const createPlaylist = async (root, { input }, context, info) => {
	return await Playlist.create(input);
};

// update playlist
const updatePlaylist = async (root, { input }, context, info) => {
	const playlist = await Playlist.findById(input.id);
	playlist.songs = [...playlist.songs, ...input.songs];
	await playlist.save();
	return playlist;
};

// delte playlist
const deletePlaylist = async (root, { id }, context, info) => {
	return await Playlist.findByIdAndRemove(id);
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
		songs: songsInPlaylist,
	},
};
