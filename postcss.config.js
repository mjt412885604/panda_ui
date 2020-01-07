module.exports = {
    plugins: [
        require('postcss-flexbugs-fixes'),
        require('autoprefixer')({
            overrideBrowserslist: [
                '>1%',
                'last 4 versions',
                'Firefox ESR',
                'not ie < 9', // React doesn't support IE8 anyway
            ]
        }),
        require('postcss-normalize')()
    ]
}