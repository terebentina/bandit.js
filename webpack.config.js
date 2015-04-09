'use strict';

var path = require('path');
var webpack = require('webpack');

module.exports = {
	entry: path.resolve(__dirname, 'src/index.js'),
	output: {
		path: path.resolve(__dirname, 'build'),
		library: 'banditJS',
		libraryTarget: 'UMD',
	},
	module: {
		loaders: [
			{ test: /\.js$/, exclude: /node_modules/, loaders: ['babel'] },
		]
	},
	target: 'web',
	devtool: '#inline-source-map',
	//devtool: true ? 'source-map' : false,
	debug: true,
	cache: true,
	stats: {
		colors: true,
		reasons: true
	},
	resolve: {
		root: path.join(__dirname, 'src'),
		extensions: ['', '.js'],
	},
	resolveLoader: {
		root: path.join(__dirname, 'node_modules'),
	},
	plugins: [
		new webpack.NoErrorsPlugin(),
		new webpack.optimize.OccurenceOrderPlugin(),
	]
};
