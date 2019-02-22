const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isDevEnvironment = process.env.NODE_ENV === 'dev';

module.exports = {
    entry: './src/client/index.tsx',
    devtool: isDevEnvironment ? 'inline-source-map' : 'source-map',
    target: 'web',
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
        path: path.resolve(__dirname, 'dist/client'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/assets/index.html'),
        }),
    ],
};
