const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

const includeSrc = [path.resolve(__dirname, './src'), path.resolve(__dirname, './example')]

module.exports = {
    mode: 'development',
    bail: false,
    devtool: 'cheap-module-source-map',
    entry: './example/index.js',
    output: {
        path: '/',
        filename: 'bundle.js',
        publicPath: './'
    },
    resolve: {
        extensions: ['.js', '.scss', '.ts', '.tsx'],
    },
    module: {
        rules: [
            {
                test: /\.(js|mjs|jsx|ts|tsx)$/,
                use: ['babel-loader'],
                include: includeSrc
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', {
                    loader: require.resolve('postcss-loader'),
                    options: {
                        ident: 'postcss',
                    },
                }],
                include: includeSrc
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader', {
                    loader: require.resolve('postcss-loader'),
                    options: {
                        ident: 'postcss',
                    },
                }],
                include: includeSrc
            },
            {
                test: /\.(gif|png|jpg|jpeg|svg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 1024,
                        name: '[name]-[hash].[ext]'
                    }
                }],
                include: includeSrc
            },
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new HtmlWebpackPlugin({
            template: 'index.html'
        }),
    ],
    devServer: {
        port: 8000,
        publicPath: '/',
        compress: true,
        overlay: {
            errors: true
        },
        open: true,
        hot: true
    }
}