import { merge } from 'lodash';

import { User } from './user.model';

// resolvers take 4 arguments
// 1st - root value
// 2nd - arguments
// 3rd - context -> info that will is used among the resolvers
// 4th - info
const getMe = (rootValue, args, { user }, info) => ({
	id: 4344809,
	username: 'hello',
	createdAt: 'jfa;lf;',
	updatedAt: 'kjafkjlha',
});

const updateMe = (root, { input }, { user }, info) => {
	merge(user, input);
	return user.save();
};

const playlistsArray = async (root, args, context, info) => {
	const playlists = await User.findById(root.id)
		.populate('playlists')
		.select('playlists')
		.exec();

	console.log(playlists);
	return playlists;
};

export const userResolvers = {
	Query: {
		getMe,
	},
	Mutation: {
		updateMe,
	},
	User: {
		playlists: playlistsArray,
	},
};

// authentication should be at the resolver's level
