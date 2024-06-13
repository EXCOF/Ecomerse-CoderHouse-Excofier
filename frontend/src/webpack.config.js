// Importamos el módulo 'path' de Node.js
const path = require('path');

// Exportamos la configuración del webpack
module.exports = {
  // Configuración para resolver módulos
  resolve: {
    // Configuración de fallback para módulos que no tienen soporte nativo en el navegador
    fallback: {
      // Resuelve el módulo 'path' para navegadores utilizando 'path-browserify'
      "path": require.resolve("path-browserify"),
      // Resuelve el módulo 'zlib' utilizando 'browserify-zlib'
      "zlib": require.resolve("browserify-zlib"),
      // Resuelve el módulo 'querystring' utilizando 'querystring-es3'
      "querystring": require.resolve("querystring-es3"),
      // Resuelve el módulo 'crypto' utilizando 'crypto-browserify'
      "crypto": require.resolve("crypto-browserify"),
      // Resuelve el módulo 'stream' utilizando 'stream-browserify'
      "stream": require.resolve("stream-browserify"),
      // Resuelve el módulo 'http' utilizando 'stream-http'
      "http": require.resolve("stream-http"),
      // Resuelve el módulo 'url' utilizando 'url'
      "url": require.resolve("url/"),
      // Resuelve el módulo 'buffer' utilizando 'buffer'
      "buffer": require.resolve("buffer/"),
      // Resuelve el módulo 'util' utilizando 'util'
      "util": require.resolve("util/"),
      // Desactiva el módulo 'fs' porque no tiene un polyfill adecuado para el navegador
      "fs": false,
      // Desactiva el módulo 'net' porque no tiene un polyfill adecuado para el navegador
      "net": false
    }
  },
  // Configuración de entrada
  entry: './src/index.js',
  // Configuración de salida
  output: {
    // Directorio de salida
    path: path.resolve(__dirname, 'dist'),
    // Nombre del archivo de salida
    filename: 'bundle.js'
  },
  // Configuración de módulos
  module: {
    // Reglas para cargar diferentes tipos de archivos
    rules: [
      {
        // Regla para archivos JavaScript
        test: /\.js$/,
        // Excluye la carpeta 'node_modules'
        exclude: /node_modules/,
        // Usa el loader 'babel-loader' con las opciones de presets '@babel/preset-env' y '@babel/preset-react'
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        // Regla para archivos CSS
        test: /\.css$/,
        // Usa los loaders 'style-loader' y 'css-loader'
        use: ['style-loader', 'css-loader']
      },
      {
        // Regla para archivos de imágenes
        test: /\.(png|svg|jpg|gif)$/,
        // Usa el loader 'file-loader'
        use: ['file-loader']
      }
    ]
  },
  // Configuración del servidor de desarrollo
  devServer: {
    // Directorio base del servidor de desarrollo
    contentBase: path.join(__dirname, 'public'),
    // Habilita la compresión
    compress: true,
    // Puerto del servidor de desarrollo
    port: 3000
  }
};
