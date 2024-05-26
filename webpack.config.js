
const path = require('path');

module.exports = {
  entry: './frontend/src/index.js', // Archivo de entrada principal de tu aplicación
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js', // Nombre del archivo de salida de JavaScript
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
        ],
      },
    ],
  },
};
