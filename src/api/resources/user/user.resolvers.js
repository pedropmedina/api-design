import { merge } from 'lodash';

import { User } from './user.model';

const getMe = (_, __, { user }) => {
	return user;
};

export const userResolvers = {
	Query: {
		getMe,
	},
};
