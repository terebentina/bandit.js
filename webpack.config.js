'use strict';

var path = require('path');
var webpack = require('webpack');

module.exports = {
	entry: path.resolve(__dirname, 'src/Bandit.js'),
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'bandit.js',
		library: 'bandit',
		libraryTarget: 'umd',
	},
	module: {
		noparse: ['pixi.js'],
		loaders: [
			{ test: /\.js$/, exclude: /pixi\.js/, loaders: ['babel?loose=all&optional[]=spec.protoToAssign'] },
			{ test: /pixi.js/, loader: 'imports?this=>window' },
		]
	},
	target: 'web',
	devtool: '#inline-source-map',
	//devtool: true ? 'source-map' : false,
	debug: true,
	cache: true,
	//stats: {
	//	colors: true,
	//	reasons: true
	//},
	resolve: {
		root: path.join(__dirname, 'src'),
		extensions: ['', '.js'],
		alias: {
			//'pixi.js': 'pixi.js/bin/pixi.js'
		}
	},
	resolveLoader: {
		root: path.join(__dirname, 'node_modules'),
	},
	plugins: [
		new webpack.NoErrorsPlugin(),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.ProvidePlugin({
			PIXI: "pixi.js",
			'window.PIXI': "pixi.js",
		}),
		new webpack.PrefetchPlugin('pixi.js'),
	]
};
