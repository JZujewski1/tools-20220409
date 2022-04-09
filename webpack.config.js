const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
  },
  module: {
    rules: [
      {
        test: /.css$/,
        use: [MiniCSSExtractPlugin.loader,'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin(
      {
        template: '.src/index.html',
      }
    ),
    new MiniCSSExtractPlugin(),
  ],
};
