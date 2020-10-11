const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: { // точка входа
    main: './src/pages/index.js'
  },
  output: { // точка выхода
    path: path.resolve(__dirname, 'dist'), // __dirname - глобальная переменная в Node.js, содержит абсолютный путь до текущей рабочей директории
    filename: 'main.js'
  },
  module: {
    rules: [
      // rules — это массив правил
      {
        // добавим в него объект правил для бабеля
        test: /\.js$/, // регулярное выражение, которое ищет все js файлы
        loader: 'babel-loader', // при обработке этих файлов нужно использовать babel-loader
        exclude: '/node_modules/' // исключает папку node_modules, файлы в ней обрабатывать не нужно
      },
      {
        test: /\.(png|svg|jpg|gif|woff2|woff)$/, // регулярное выражение, которое ищет все файлы с такими расширениями
        loader: 'file-loader' // при обработке этих файлов нужно использовать file-loader
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.css$/,
        loader: [MiniCssExtractPlugin.loader, 'css-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new MiniCssExtractPlugin()
  ]
}
