process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

const webpack = require('webpack');
const path = require('path');
const pkg = require('../package.json');
const nodeExternals = require('webpack-node-externals')
const ExtractTextPlugin = require("extract-text-webpack-plugin")


module.exports = function (entry, isMinify) {
    const plugins = [
        new webpack.BannerPlugin([
            pkg.name + ' v' + pkg.version + ' (' + pkg.homepage + ')',
            'Copyright ' + new Date().getFullYear() + ', ' + pkg.author,
            pkg.license + ' license'
        ].join('\n')),
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
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new ExtractTextPlugin({
            filename: '[name].css',
            allChunks: true, // 模块中提取css
        })
    ]
    if (isMinify) {
        plugins.push(new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: true
            }
        }))
    }

    return {
        context: path.join(__dirname, '../packages'),
        entry: {
            pandaui: './index.js'
        },
        output: {
            path: path.join(__dirname, '../dist'),
            filename: isMinify ? '[name].min.js' : '[name].js',
            library: 'pandaui',
            libraryTarget: 'commonjs2'
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
        plugins: plugins,
        resolve: {
            modules: ['node_modules', path.join(__dirname, '../node_modules')],
            extensions: ['.web.js', '.js', '.json'],
            alias: {}
        },
        externals: [nodeExternals()],
        devtool: false
    }
}