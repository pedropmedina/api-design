import express from 'express';

import { playlistRouter } from './resources/playlist';
import { songRouter } from './resources/song';
import { userRouter } from './resources/user';
import { apiErrorHandler } from './modules/errorhandler';

export const restRouter = express.Router();

restRouter.use('/playlist', playlistRouter);
restRouter.use('/song', songRouter);
restRouter.use('/user', userRouter);
// The error handler must be at the bottom, else it won't be called
// as it is called with next in the controllers defined in the
// query files.
restRouter.use(apiErrorHandler);
