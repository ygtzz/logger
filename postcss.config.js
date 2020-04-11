var config = require('./build/config');
var env = process.env.NODE_ENV;

var aPlugin = [
	require('autoprefixer')({ browsers: ['> 5%', 'ie 9'] })
];
if (env == 'production') {
	aPlugin.push(require('postcss-clean')({}));
}

module.exports = {
	plugins: aPlugin
}