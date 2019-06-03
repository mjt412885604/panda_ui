var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin'); //生成html


module.exports = {
    context: path.join(__dirname, '../'),
    entry: {
        pandaui: './example/index.js'
    },
    output: {
        path: path.join(__dirname, '../demo'),
        filename: 'js/[name].bundle.js', //打包后输出文件的文件名
        chunkFilename: 'js/[name].[chunkhash:5].chunk.js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            use: [{
                loader: 'babel-loader'
            }],
            exclude: /node_modules/
        }, {
            test: /\.css$/,
            use: ['style-loader', 'css-loader', 'postcss-loader']
        }, {
            test: /\.scss$/,
            use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
        }, {
            test: /\.(png|jpg|gif|svg)$/,
            loader: ['url-loader?limit=8192&name=images/[name].[ext]']
        }]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: function () {
                    return [
                        require('autoprefixer')({
                            browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8', 'iOS >= 8', 'Android >= 4']
                        })
                    ];
                }
            }
        }),
        new HtmlWebpackPlugin({
            title: 'hello react.js',
            filename: './index.html',
            template: path.resolve(__dirname, '../index.html'),
            hash: true
        }),
        new webpack.ProvidePlugin({
            '@': path.resolve(__dirname, '../example')
        })
    ],
    resolve: {
        modules: ['node_modules', path.join(__dirname, '../node_modules')],
        extensions: ['.web.js', '.js', '.json'],
        alias: {}
    },
    devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map'
    // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })

    ])
}