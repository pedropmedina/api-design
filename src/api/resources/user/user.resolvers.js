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

export const userResolvers = {
	Query: {
		getMe,
	},
	// Below is an example using nested resolvers.
	// Nested resolvers are resolvers at the object type field
	// not at the root field
	User: {
		friends: root => {
			return ['Bianca', 'Luca'];
		},
	},
	Mutation: {
		updateMe,
	},
};
