const path = require('path');

module.exports = {
  // Punto de entrada de la aplicación
  entry: './index.js',
  // Configuración de salida para los archivos compilados
  output: {
    path: path.resolve(__dirname, 'dist'), // Directorio de salida
    filename: 'bundle.js' // Nombre del archivo de salida
  },
  // Configuración de resolución de módulos
  resolve: {
    extensions: ['.js', '.jsx'], // Extensiones de archivo que se pueden resolver
    fallback: {
      // Módulos que necesitan ser emulados en entornos de navegador
      "path": require.resolve("path-browserify"),
      "crypto": require.resolve("crypto-browserify"),
      "stream": require.resolve("stream-browserify"),
      "http": require.resolve("stream-http"),
      "url": require.resolve("url/"),
      "buffer": require.resolve("buffer/"),
      "util": require.resolve("util/")
    }
  },
  // Reglas para procesar diferentes tipos de archivos
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // Tipos de archivos que deben pasar por el loader
        exclude: /node_modules/, // Carpeta a excluir
        use: {
          loader: 'babel-loader', // Loader para transpilar JavaScript
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'] // Presets de Babel
          }
        }
      },
      {
        test: /\.css$/, // Tipos de archivos CSS
        use: ['style-loader', 'css-loader'] // Loaders para procesar archivos CSS
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/, // Tipos de archivos de imágenes
        use: [
          {
            loader: 'file-loader', // Loader para manejar archivos de imágenes
            options: {
              name: '[path][name].[ext]', // Nombre de salida de los archivos
              context: path.resolve(__dirname, 'src'), // Directorio base
              outputPath: 'assets', // Directorio de salida
              publicPath: '../assets', // Ruta pública de los archivos
              useRelativePaths: true // Utilizar rutas relativas
            }
          }
        ]
      }
    ]
  },
  // Configuración del servidor de desarrollo
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'), // Directorio de archivos estáticos
    },
    compress: true, // Habilitar compresión gzip
    port: 8080, // Puerto del servidor
    proxy: [ // Configuración del proxy para redireccionar peticiones
      {
        context: ['/api'], // Contexto de las peticiones a redireccionar
        target: 'http://localhost:3000', // URL del servidor destino
        changeOrigin: true // Cambiar el origen de la petición
      }
    ]
  },
  mode: 'development' // Modo de desarrollo
};