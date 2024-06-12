const path = require('path');

module.exports = {
  // Configuraciones de Webpack
  resolve: {
    fallback: {
      "path": require.resolve("path-browserify"),
      "zlib": require.resolve("browserify-zlib"),
      "querystring": require.resolve("querystring-es3"),
      "crypto": require.resolve("crypto-browserify"),
      "stream": require.resolve("stream-browserify"),
      "http": require.resolve("stream-http"),
      "url": require.resolve("url/"),
      "buffer": require.resolve("buffer/"),
      "util": require.resolve("util/")
    }
  },
  entry: './src/index.js', // Archivo de entrada principal
  output: {
    path: path.resolve(__dirname, 'dist'), // Carpeta de salida
    filename: 'bundle.js' // Nombre del archivo de salida
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Regla para archivos JavaScript
        exclude: /node_modules/, // Excluir la carpeta node_modules
        use: {
          loader: 'babel-loader', // Utilizar el loader de Babel para transpilar JavaScript
          options: {
            presets: ['@babel/preset-env'] // Presets de Babel
          }
        }
      },
      // Puedes agregar más reglas de carga para otros tipos de archivos, como CSS, HTML, etc.
    ]
  }
};