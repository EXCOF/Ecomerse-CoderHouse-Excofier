const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js', // Archivo de entrada principal
  output: {
    path: path.resolve(__dirname, 'dist'), // Carpeta de salida
    filename: 'bundle.js' // Nombre del archivo de salida
  },
  resolve: {
    fallback: {
      "path": require.resolve("path-browserify"),
      "crypto": require.resolve("crypto-browserify"),
      "stream": require.resolve("stream-browserify"),
      "http": require.resolve("stream-http"),
      "url": require.resolve("url/"),
      "buffer": require.resolve("buffer/"),
      "util": require.resolve("util/")
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // Regla para archivos JavaScript y JSX
        exclude: /node_modules/, // Excluir la carpeta node_modules
        use: {
          loader: 'babel-loader', // Utilizar el loader de Babel para transpilar JavaScript y JSX
        }
      },
      {
        test: /\.css$/, // Regla para archivos CSS
        use: ['style-loader', 'css-loader'] // Loaders para manejar CSS
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/, // Regla para archivos de imágenes
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]', // Mantener la estructura y el nombre del archivo
              context: path.resolve(__dirname, 'src'), // Establecer el contexto
              outputPath: 'assets', // Carpeta de salida
              publicPath: '../assets', // Carpeta pública
              useRelativePaths: true // Usar rutas relativas
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html', // Archivo HTML de entrada
      filename: 'index.html' // Archivo HTML de salida
    })
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'), // Carpeta pública para servir contenido
    },
    compress: true,
    port: 3000, // Puerto del servidor de desarrollo
  },
  mode: 'development'
};