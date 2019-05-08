const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.config');
const config = require('./config');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    output: {
        filename: 'static/js/[name].js',
        path: config.distPath,
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.(css|scss)$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2
                        }
                    },
                    'postcss-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new BundleAnalyzerPlugin()
    ],
    devServer: {
        contentBase: config.distPath,
        host: '0.0.0.0',
        hotOnly: true,
        publicPath: '/'
    }
};