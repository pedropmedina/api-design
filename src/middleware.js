import express from 'express';

const setGlobalMiddleware = app => {
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));
};

export default setGlobalMiddleware;
