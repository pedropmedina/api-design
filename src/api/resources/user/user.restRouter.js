import express from 'express';

import userControllers from './user.controller';

export const userRouter = express.Router();

userRouter.param('id', userControllers.findByParam);

userRouter
	.route('/')
	.post(userControllers.createOne)
	.get(userControllers.getAll);

userRouter
	.route('/:id')
	.get(userControllers.getOne)
	.put(userControllers.updateOne)
	.delete(userControllers.deleteOne);
