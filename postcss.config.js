var config = require('./build/config');
var env = process.env.NODE_ENV;

var aPlugin = [
	require('autoprefixer')({ browsers: ['> 5%', 'ie 9'] })
];
if (config.enableRem) {
	aPlugin.push(require('postcss-plugin-px2rem')(config.px2remOptions));
	aPlugin.push(require('postcss-flexible')(config.px2rem));
}
if (env == 'production') {
	aPlugin.push(require('postcss-clean')({}));
}

module.exports = {
	plugins: aPlugin
}