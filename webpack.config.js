const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const ESLintWebpackPlugin = require('eslint-webpack-plugin');
module.exports = {
  entry:[ './src/main.js', './src/style.scss'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
  },
  module: {
    rules: [
      {
        test: /.scss$/,
        use: [MiniCSSExtractPlugin.loader,'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin(
      {
        template: './src/index.html',
      }
    ),
    new MiniCSSExtractPlugin(),
    new ESLintWebpackPlugin(),
  ],
  
};
