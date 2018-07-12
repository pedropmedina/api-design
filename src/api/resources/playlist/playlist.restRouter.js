import express from 'express';

import playlistController from './playlist.controller';

export const playlistRouter = express.Router();

playlistRouter.param('id', playlistController.findByParam);

playlistRouter
	.route('/')
	.post(playlistController.createOne)
	.get(playlistController.getAll);

playlistRouter
	.route('/:id')
	.get(playlistController.getOne)
	.put(playlistController.updateOne)
	.delete(playlistController.deleteOne);
