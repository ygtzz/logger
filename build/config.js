var path = require('path');

var sBase = './src/';
module.exports = {
    sBase: sBase,
    sDist: path.resolve(__dirname, '../dist'),
    sDest: './dist',
    entry: {
        index: sBase + 'pages/index/index.js'
    },
    dev: {
        proxy: {},
        env: '',
        port: 8086,
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        proxyTable: {},
    },
    pre: {
        
    },
    prod: {
        path: {
            script: 'static/scripts/',
            style: 'static/style/'
        }
    }
}