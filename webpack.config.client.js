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
            {
                test: /\.scss$/,
                exclude: [path.resolve('src/client/components')],
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            includePaths: ['src'],
                        },
                    },
                ],
            },
            {
                test: /\.scss$/,
                include: [path.resolve('src/client/components')],
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'typings-for-css-modules-loader',
                        options: {
                            localIdentName: '[local]-[hash:base64:5]',
                            modules: true,
                            namedExport: true,
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            includePaths: ['src'],
                        },
                    },
                ],
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
    devServer: {
        port: 8080,
        historyApiFallback: true,
    },
    node: {
        fs: 'empty',
        path: 'empty',
        net: 'empty',
    },
};
