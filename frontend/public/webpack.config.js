const path = require('path');

module.exports = {
  // configuraciones de webpack
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
  }
};