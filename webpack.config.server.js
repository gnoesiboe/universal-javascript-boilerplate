const path = require('path');

module.exports = {
  entry: './src/server/index.ts',
  devtool: 'inline-source-map',
  target: "node",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist/server')
  },
  node: {
    fs: 'empty',
    path: true
  }
};
