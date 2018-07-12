const webpack = require('webpack');
const path = require('path');

// a library to use with the 'externals' property to exclude dependencies
// from being bundle https://github.com/liady/webpack-node-externals
const nodeExternals = require('webpack-node-externals');

// Automatically starts server once Webpack's build completes
// https://github.com/ericclemmons/start-server-webpack-plugin
const StartServerPlugin = require('start-server-webpack-plugin');

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
