const path = require('path');
const config = require('./config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const merge = require('webpack-merge');
const devWebpackConfig = require('./webpack.dev.config');
const prodWebpackConfig = require('./webpack.prod.config');
const packagejson = require("../package.json");

const generateConfig = env => {
    const isProd = env.NODE_ENV === 'production';
    return {
        entry: {
            app: path.join(config.srcPath, 'index.js'),
            print: path.join(config.srcPath, 'print.js'),
            vendor: Object.keys(packagejson.dependencies)
        },
        resolve: {
            alias: {
                'assets': path.join(config.srcPath, 'assets')
            }
        },
        module: {
            rules: [
                {
                    test: /\.(png|svg|jpg|jpeg|gif)$/,
                    use: [
                        {
                           loader: 'file-loader',
                           options: {
                               name: isProd ? 'static/images/[name].[hash:6].[ext]' : 'static/images/[name].[ext]'
                           }
                        }
                    ]
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: isProd ? 'static/fonts/[name].[hash:6].[ext]' : 'static/fonts/[name].[ext]'
                            }
                        }
                    ]
                }
            ]
        },
        plugins: [
            new CleanWebpackPlugin(),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'common',
                chunks: ['app', 'print'],
                filename: isProd ? '[name].[chunkhash:6].js' : '[name].js',
                minChunks: 2
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: ['vendor', 'manifest'],
                filename: isProd ? '[name].[chunkhash:6].js' : '[name].js',
                minChunks: Infinity
            }),
    
            // new webpack.optimize.CommonsChunkPlugin({
            //     name: 'vendor',
            //     filename: '[name].[chunkhash:6].js',
            //     miniChunks: Infinity
            // }),
            // new webpack.optimize.CommonsChunkPlugin({
            //     name: 'manifest',
            //     filename: '[name].[chunkhash:6].js',
            //     chunks: ['vendor']
            // }),        
            new HtmlWebpackPlugin({
                title: 'Output Management'
            })
        ]
    };
};

module.exports = env => {
    console.log(env);
    let config = env.NODE_ENV === 'production' ? prodWebpackConfig : devWebpackConfig;
    return merge(generateConfig(env), config);
};
