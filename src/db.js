import mongoose from 'mongoose';

import config from './config';

mongoose.Promise = global.Promise;

const options = {
	useNewUrlParser: true,
};

export default async () => {
	try {
		await mongoose.connect(
			config.db.url,
			options,
		);
		console.log('Successful connection to mongodb');
	} catch (error) {
		console.log(error);
	}
};
