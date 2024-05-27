import path from 'path';

export default {
  entry: './src/index.js', // Archivo de entrada principal de tu aplicación
  output: {
    path: path.resolve('distribution', 'dist'),
    filename: 'bundle.js', // Nombre del archivo de salida de JavaScript
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
    ],
  },
  mode: 'development',
};
