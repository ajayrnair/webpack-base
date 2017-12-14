var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        /* List of npm modules that must go into vendor bundle.
        Check CommonsChunkPlugin to avoid duplicate modules in vendor and app bundles
        */
        bundle: './src/index.js',
        vendor: ["react", "redux"]
    },
    output: {
        path: path.join(__dirname, 'dist'),
        //Chunk hash used for cache busting, Add manifest in CommonsChunkPlugin!!
        filename: '[name].[chunkhash].js'
    },
    module: {
        rules: [{
                use: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            },
            {
                //You can use ExtractTextPlugin as in webpack.config.js to create a seperate file
                use: ['style-loader', 'css-loader'],
                test: /\.css$/
            }
        ]
    },
    plugins: [
        //Commons Chunk Plugin to specify not to duplicate the modules
        //between vendor and app bundle. If common put it in the vendor module
        //as mentioned in the names array
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest']
        }),
        //Use src/index.html as template and add all the bundles in a script tag automatically
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        })
    ]
};