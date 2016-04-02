var path = require('path');
var webpack = require('webpack');

module.exports = function(fabricatorConfig) {

	"use strict";

	var config = {
		entry: {
			'fabricator/scripts/f': fabricatorConfig.src.scripts.fabricator,
			'toolkit/scripts/toolkit': fabricatorConfig.src.scripts.toolkit,
			'toolkit/scripts/vendor/bliss': fabricatorConfig.src.scripts.bliss
		},
		output: {
			path: path.resolve(__dirname, fabricatorConfig.dest, 'assets'),
			filename: '[name].js'
		},
		externals: {
			'modernizr': 'Modernizr',
			'bliss': 'Bliss'
		},
		module: {
			loaders: [
				{
					test: /\.js$/,
					exclude: [/node_modules/, /\.min\.js$/],
					loaders: ['babel-loader']
				}
			]
		},
		plugins: [],
		cache: {}
	};

	if (!fabricatorConfig.dev) {
		config.plugins.push(
			new webpack.optimize.UglifyJsPlugin()
		);
	}

	return config;

};
