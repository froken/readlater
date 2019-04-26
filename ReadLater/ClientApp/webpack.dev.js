const merge = require ('webpack-merge');
const common = require ('./webpack.common.js');
const path = require ('path');
const HtmlWebpackPlugin = require ('html-webpack-plugin');

module.exports = merge (common, {
  output: {
    path: path.join (__dirname, '../wwwroot/js'),
        filename: 'bundle.js',
        publicPath: '/'
  },
  devServer: {
    contentBase: path.join (__dirname, '../wwwroot'),
    port: 9000
  },
  plugins: [
    new HtmlWebpackPlugin({
        template: "./src/index.html"
      })
  ],
  entry: {'main-client': ['@babel/polyfill', './src/index.js']},
  mode: 'development',
  watch: true,
});
