const path = require('path');

module.exports = {
    entry: './src2/mainGame.js',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, "./")
    },
    devtool: 'source-map'
};