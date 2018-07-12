export const config = {
	port: process.env.PORT,
	db: {
		url: process.env.MONGODB_URI,
	},
	secrets: {
		JWT_SECRET: process.env.JWT_SECRET,
	},
	expireTime: '30d',
};
