const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path:path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: '/node_modules',
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader'
        }
      },
      {
        test: /\.(s*)css$/,
        use: [
          {
            loader: miniCssExtractPlugin.loader
          },
          'css-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg)$/,
        use: [
          {
            loader: 'file-loader',
            options: { name: 'assets/[hash].[ext]'}
          }
        ]
      }
    ]
  },
  devServer: {
    historyApiFallback: true
  },
  plugins: [
    new htmlWebpackPlugin({
      template: './public/index.html',
      filename: './index.html'
    }),
    new miniCssExtractPlugin({
      filename: 'assets/[name].css'
    })
  ]
}