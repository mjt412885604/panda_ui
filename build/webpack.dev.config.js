var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin'); //生成html
var ExtractTextPlugin = require("extract-text-webpack-plugin"); //css单独打包


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
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: [{
                    loader: 'css-loader',
                    options: {
                        minimize: true, //css压缩
                        importLoaders: 1
                    }
                }, 'postcss-loader'],
            })
        }, {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: [{
                    loader: 'css-loader',
                    options: {
                        minimize: true, //css压缩
                        importLoaders: 1
                    }
                }, 'postcss-loader', 'sass-loader'],
            })
        }, {
            test: /\.(png|jpg|gif|svg)$/,
            loader: ['url-loader?limit=8192&name=images/[name].[ext]']
        }]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.NamedModulesPlugin(),
        new ExtractTextPlugin({
            filename: '[name].css',
            allChunks: true, // 模块中提取css
        }),
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
    module.exports.devtool = false
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