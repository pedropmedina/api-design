import { merge } from 'lodash';

const env = process.env.NODE_ENV;

const baseConfig = {
	port: 3000,
	secrets: {
		JWT_SECRET: 'secret',
	},
	db: {
		url: 'mongodb://localhost:3000/API',
	},
};

let envConfig = {};

switch (env) {
	case 'development':
	case 'dev':
		envConfig = require('./dev').config;
		break;
	case 'testing':
	case 'test':
		envConfig = require('./test').config;
		break;
	case 'prod':
	case 'production':
		envConfig = require('./prod').config;
		break;
	default:
		envConfig = require('./dev').config;
}

export default merge(baseConfig, envConfig);
