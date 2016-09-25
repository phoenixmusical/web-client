'use strict';
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const validate = require('webpack-validator');
const parts = require('./lib/parts');
const pkg = require('./package.json');

const PATHS = {
    app: path.join(__dirname, 'app'),
    style: [
        path.join(__dirname, 'app'),
    ],
    htmlTemplate: path.join(__dirname, 'app', 'index.html'),
    build: path.join(__dirname, 'build'),
};

const common = {
    entry: {
        app: PATHS.app,
    },
    output: {
        path: PATHS.build,
        filename: '[name].js',
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loaders: ['babel?cacheDirectory'],
                include: PATHS.app,
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: PATHS.htmlTemplate,
        }),
    ],
    resolve: {
        extensions: ['', '.js', '.jsx'],
    },
};

let config;

// Detect how npm is run and branch based on that
switch (process.env.npm_lifecycle_event) {
    case 'build':
    case 'stats':
        config = merge(
            common,
            {
                devtool: 'source-map',
                output: {
                    path: PATHS.build,
                    publicPath: '/membres/',
                    filename: '[name].[chunkhash].js',
                    chunkFilename: '[chunkhash].js',
                },
            },
            parts.clean(PATHS.build),
            parts.setFreeVariable(
                'process.env.NODE_ENV',
                'production'
            ),
            parts.extractBundle({
                name: 'vendor',
                entries: Object.keys(pkg.dependencies),
            }),
            parts.minify(),
            parts.extractCSS(PATHS.style),
            parts.purifyCSS(PATHS.style)
        );
        break;
    default:
        config = merge(
            common,
            {
                devtool: 'eval-source-map',
            },
            parts.setupCSS(PATHS.style),
            parts.devServer({
                // Customize host/port here if needed
                host: process.env.HOST,
                port: process.env.PORT,
            })
        );
}

// Run validator in quiet mode to avoid output in stats
module.exports = validate(config, {
    quiet: true,
});
