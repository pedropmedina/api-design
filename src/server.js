import express from 'express';

import connect from './db';
import setupMiddleware from './middleware';

import { restRouter } from './api';
import { signin, protect } from './api/modules/auth';

connect();

const app = express();

setupMiddleware(app);

app.use('/signin', signin);
app.use('/api', restRouter);

app.all('*', (req, res) => {
	res.json({ ok: true });
});

export default app;
