const path = require('path'); // Importa el módulo 'path' de Node.js

module.exports = {
  // Configuraciones de Webpack
  resolve: {
    fallback: {
      // Configura los fallbacks para los módulos que pueden ser necesarios para la ejecución del código en el navegador
      "path": require.resolve("path-browserify"), // Proporciona la funcionalidad de manejo de rutas para el navegador
      "zlib": require.resolve("browserify-zlib"), // Proporciona la funcionalidad de compresión zlib para el navegador
      "querystring": require.resolve("querystring-es3"), // Proporciona la funcionalidad de análisis de cadenas de consulta para el navegador
      "crypto": require.resolve("crypto-browserify"), // Proporciona la funcionalidad de criptografía para el navegador
      "stream": require.resolve("stream-browserify"), // Proporciona la funcionalidad de streams para el navegador
      "http": require.resolve("stream-http"), // Proporciona la funcionalidad de HTTP para el navegador
      "url": require.resolve("url/"), // Proporciona la funcionalidad de manejo de URLs para el navegador
      "buffer": require.resolve("buffer/"), // Proporciona la funcionalidad de buffers para el navegador
      "util": require.resolve("util/") // Proporciona utilidades adicionales para el navegador
    }
  },
  entry: './src/index.js', // Especifica el archivo de entrada principal para la aplicación
  output: {
    path: path.resolve(__dirname, 'dist'), // Especifica la carpeta de salida para los archivos generados por Webpack
    filename: 'bundle.js' // Especifica el nombre del archivo de salida generado por Webpack
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Define una regla para archivos JavaScript
        exclude: /node_modules/, // Excluye la carpeta node_modules de la transformación
        use: {
          loader: 'babel-loader', // Utiliza el loader de Babel para transpilar JavaScript
          options: {
            presets: ['@babel/preset-env'] // Especifica los presets de Babel a utilizar
          }
        }
      },
      
    ]
  }
};