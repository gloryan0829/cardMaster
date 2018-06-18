var webpack = require('webpack');
var path = require('path');
var buildEntryPoint = function(entryPoint){
    return [
        'webpack-dev-server/client?http://localhost:8000',
        'webpack/hot/only-dev-server',
        entryPoint
    ]
};

module.exports = {
    entry: {
        bundle: buildEntryPoint(path.join(__dirname, 'public/index.js'))
    },
    mode : 'development',
    output: {
        filename: 'bundle.js'
    },
    devServer: {
        hot: true,
        inline: true,
        port: 8000,
        contentBase: __dirname + '/public/',
    },

    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
                presets:['es2015']
            }
        }]
    },
    plugins: [ new webpack.HotModuleReplacementPlugin() ]
}