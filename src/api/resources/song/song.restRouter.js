import express from 'express';

import songControllers from './song.controller';

export const songRouter = express.Router();

songRouter.param('id', songControllers.findByParam);

songRouter
	.route('/')
	.post(songControllers.createOne)
	.get(songControllers.getAll);

songRouter
	.route('/:id')
	.get(songControllers.getOne)
	.put(songControllers.updateOne)
	.delete(songControllers.deleteOne);
