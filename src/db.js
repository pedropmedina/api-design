import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const options = {
	useNewUrlParser: true,
};

export default async () => {
	try {
		await mongoose.connect(
			'mongodb://localhost:27017/apiDesign',
			options,
		);
		console.log('Successful connection to mongodb');
	} catch (error) {
		console.log(error);
	}
};
