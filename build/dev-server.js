const webpack = require("webpack");
const chalk = require('chalk')
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.dev.config');

const devServer = new WebpackDevServer(webpack(config), {
    hot: true,
    open: true,
    historyApiFallback: true, //不跳转
    inline: true, //实时刷新
    proxy: {

    }
})

const port = 9000

devServer.listen(port, 'localhost', err => {
    if (err) {
        return console.log(err);
    }
    var uri = 'http://localhost:' + port
    console.log('Starting the development server...\n');
    console.log(chalk.blue('> Listening at ' + uri + '\n'))
})