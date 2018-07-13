import { makeExecutableSchema } from 'graphql-tools';
import { graphqlExpress } from 'apollo-server-express';
import { merge } from 'lodash';

import { userType, userResolvers, userRouter } from './resources/user';
import { songType } from './resources/song';
import { playlistType } from './resources/playlist';

const baseSchema = `
	schema {
		query: Query
	}
`;

const schema = makeExecutableSchema({
	// all the graphql files
	typeDefs: [baseSchema, userType, songType, playlistType],
	// all the resolvers
	resolvers: merge({}, userResolvers),
});

export const graphQLRouter = graphqlExpress(req => ({
	schema,
	context: {
		req,
		user: req.user,
	},
}));
