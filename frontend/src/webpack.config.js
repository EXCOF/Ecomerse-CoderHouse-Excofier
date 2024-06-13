const path = require('path'); // Importa el módulo Path para manejar rutas de archivos

module.exports = {
  entry: './src/index.js', // Archivo de entrada principal para Webpack
  output: {
    path: path.resolve(__dirname, 'dist'), // Carpeta de salida para los archivos compilados
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
            presets: ['@babel/preset-env', '@babel/preset-react'] // Presets de Babel para ES6+ y JSX
          }
        }
      },
      {
        test: /\.css$/, // Regla para archivos CSS
        use: ['style-loader', 'css-loader'] // Utilizar style-loader y css-loader para manejar CSS
      },
      {
        test: /\.(png|svg|jpg|gif)$/, // Regla para archivos de imágenes
        use: ['file-loader'] // Utilizar file-loader para manejar archivos estáticos
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'), // Carpeta de contenido estático para el servidor de desarrollo
    compress: true, // Habilitar compresión gzip
    port: 9000 // Puerto en el que correrá el servidor de desarrollo
  }
};
