import express from 'express';
import { graphiqlExpress } from 'apollo-server-express';

import connect from './db';
import setupMiddleware from './middleware';

import { restRouter, graphQLRouter } from './api';
import { signin, protect } from './api/modules/auth';

connect();

const app = express();

setupMiddleware(app);

// RESTful
app.use('/signin', signin);
app.use('/api', restRouter);

// GraphQL
app.use('/graphql', graphQLRouter);
app.use('/docs', graphiqlExpress({ endpointURL: '/graphql' }));

app.all('*', (req, res) => {
	res.json({ ok: true });
});

export default app;
