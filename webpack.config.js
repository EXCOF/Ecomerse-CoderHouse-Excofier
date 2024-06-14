const path = require('path');

module.exports = {
  entry: './src/index.js', // Archivo de entrada principal
  output: {
    path: path.resolve(__dirname, 'dist'), // Carpeta de salida
    filename: 'bundle.js' // Nombre del archivo de salida
  },
  resolve: {
    extensions: ['.js', '.jsx'], // Extensiones que Webpack resolverá
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
          loader: 'babel-loader', // Utilizar el loader de Babel para transpilar JavaScript
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'] // Presets de Babel
          }
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
              publicPath: 'assets', // Carpeta pública
              useRelativePaths: true // Usar rutas relativas
            }
          }
        ]
      }
    ]
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'), // Carpeta pública para servir contenido
    },
    compress: true,
    port: 8080, // Puerto del servidor de desarrollo
  },
  mode: 'development' // Modo de Webpack
};