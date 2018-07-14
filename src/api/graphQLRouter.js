import { makeExecutableSchema } from 'graphql-tools';
import { graphqlExpress } from 'apollo-server-express';
import { merge } from 'lodash';

import { userType, userResolvers, userRouter } from './resources/user';
import { songType, songResolvers } from './resources/song';
import { playlistType, playlistResolvers } from './resources/playlist';

const baseSchema = `
	schema {
		query: Query
	}
`;

// Stitch schemas
const schema = makeExecutableSchema({
	typeDefs: [baseSchema, userType, songType, playlistType],
	resolvers: merge({}, userResolvers, songResolvers, playlistResolvers),
});

export const graphQLRouter = graphqlExpress(req => ({
	schema,
	context: {
		req,
		user: req.user,
	},
}));
