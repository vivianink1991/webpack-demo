const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.config');
const config = require('./config');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractSASS = new ExtractTextPlugin('static/style/[name].[contenthash:6].css');

module.exports = {
    devtool: 'source-map',
    output: {
        filename: 'static/js/[name].[chunkhash:6].js',
        path: config.distPath,
        publicPath: '/static.fe.com/'
    },
    module: {
        rules: [
            {
                test: /\.(css|scss)$/,
                use: extractSASS.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 2
                            }
                        },
                        'postcss-loader',
                        'sass-loader'
                    ]
                })
            }
        ]
    },
    plugins: [
        new webpack.HashedModuleIdsPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true
        }),
        extractSASS
    ]
};