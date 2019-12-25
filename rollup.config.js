import postcss from 'rollup-plugin-postcss'
import { eslint } from 'rollup-plugin-eslint'
import commonjs from 'rollup-plugin-commonjs'
import clear from 'rollup-plugin-clear'
import external from 'rollup-plugin-peer-deps-external'
import url from 'rollup-plugin-url'
import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import { uglify } from 'rollup-plugin-uglify'
import { terser } from 'rollup-plugin-terser'
import replace from 'rollup-plugin-replace'
import json from 'rollup-plugin-json'
import nested from 'postcss-nested'
import cssnext from 'postcss-cssnext'
import postcssUrl from 'postcss-url'
import copy from 'rollup-plugin-copy'
import cssnano from 'cssnano'

const env = process.env.NODE_ENV

export default {
    input: 'src/index.js',
    output: [{
        dir: 'dist',
        format: 'cjs',
        sourcemap: false
    }],
    external: [
        'react',
        'react-dom',
        'prop-types',
        'classnames'
    ],
    experimentalCodeSplitting: true,
    plugins: [
        clear({
            targets: ['dist', 'lib', 'es'],
        }),
        postcss({
            extensions: [".scss", ".less", ".css"],
            plugins: [
                nested(),
                cssnext({
                    warnForDuplicates: false
                }),
                postcssUrl({
                    url: 'inline'
                }),
                cssnano()
            ],
            extract: true // 无论是 dev 还是其他环境这个配置项都不做 样式的抽离
        }),
        url(),
        babel({
            exclude: ["node_modules/**"]
        }),
        resolve(),
        commonjs({
            include: ["node_modules/**"]
        }),
        json(),
        eslint({
            include: ["src/**/*.js"],
            exclude: ["src/styles/**"]
        }),
        replace({
            "process.env.NODE_ENV": JSON.stringify(env)
        }),
        copy({
            targets: [
                { src: 'src/index.d.ts', dest: 'dist' },
                { src: 'src/index.d.ts', dest: 'lib' }
            ]
        }),
        env === "production" && terser({
            parse: {
                ecma: 8,
            },
            compress: {
                ecma: 5,
                warnings: false,
                comparisons: false,
                inline: 2,
                drop_console: true
            },
            mangle: {
                safari10: true,
            },
            output: {
                ecma: 5,
                comments: false,
                ascii_only: true,
            },
        })
    ].filter(Boolean)
}