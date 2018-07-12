const webpack = require('webpack');
const path = require('path');

// a library to use with the 'externals' property to exclude dependencies
// from being bundle https://github.com/liady/webpack-node-externals
const nodeExternals = require('webpack-node-externals');

// Automatically starts server once Webpack's build completes
// https://github.com/ericclemmons/start-server-webpack-plugin
const StartServerPlugin = require('start-server-webpack-plugin');

// require variables based on environments
const env = process.env.NODE_ENV || 'development';

if (env === 'development') {
	require('dotenv').config({ path: '.env.development' });
} else if (env === 'test') {
	require('dotenv').config({ path: '.env.test' });
}

module.exports = {
	entry: ['webpack/hot/poll?1000', './src/index'],
	watch: true,
	mode: 'development',
	devtool: 'sourcemap',
	target: 'node',
	node: {
		__filename: true,
		__dirname: true,
	},
	externals: [nodeExternals({ whitelist: ['webpack/hot/poll?1000'] })],
	optimization: {
		noEmitOnErrors: true,
		namedModules: true,
	},
	module: {
		rules: [
			{
				test: /\.js?$/,
				use: { loader: 'babel-loader' },
				exclude: /node_modules/,
			},
			{
				test: /\.(graphql|gql)$/,
				exclude: /node_modules/,
				use: { loader: 'raw-loader' },
			},
		],
	},
	plugins: [
		new StartServerPlugin('server.js'),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.DefinePlugin({
			'process.env': { BUILD_TARGET: JSON.stringify('server') },
			'process.env.PORT': JSON.stringify(process.env.PORT),
			'process.env.MONGODB_URI': JSON.stringify(process.env.MONGODB_URI),
			'process.env.JWT_SECRET': JSON.stringify(process.env.JWT_SECRET),
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
		}),
		new webpack.BannerPlugin({
			banner: 'require("source-map-support").install();',
			raw: true,
			entryOnly: false,
		}),
	],
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'server.js',
	},
};
