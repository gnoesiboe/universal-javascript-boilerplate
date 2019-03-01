const path = require('path');
const isDevEnvironment = process.env.NODE_ENV === 'dev';
const Dotenv = require('dotenv-webpack');

module.exports = {
    entry: './src/server/index.ts',
    devtool: isDevEnvironment ? 'inline-source-map' : 'source-map',
    target: 'node',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist/server'),
    },
    node: {
        fs: 'empty',
        path: true,
    },
    plugins: [
        new Dotenv({
            path: path.resolve(__dirname, '.server.env'),
        }),
    ],
};
