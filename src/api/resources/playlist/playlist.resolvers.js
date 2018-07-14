import { Playlist } from './playlist.model';

const allPlaylists = () => {
	return Playlist.find({}).exec();
};

const getPlaylist = async (root, { id }) => {
	const playlist = await Playlist.findById(id).exec();

	if (!playlist) {
		throw new Error('No playlist exists with provided id');
	}

	return playlist;
};

export const playlistResolvers = {
	Query: {
		allPlaylists,
		getPlaylist,
	},
	Playlist: {
		songs: async (root, args, context, info) => {
			const songs = await Playlist.findById(root.id)
				.populate('songs')
				.select('songs')
				.exec();

			return songs.songs;
		},
	},
};
