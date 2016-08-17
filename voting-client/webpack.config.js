var webpack = require('webpack');

// entry for the client side lib of webpack server
// entry for webpack hot module loader
// replacement support not enabled by default
// so we need to load the plugin  in plugins
//and enable it in the devserver
module.exports = {
 entry: [
  'webpack-dev-server/client?http://localhost:8080',
  'webpack/hot/only-dev-server',
  './src/index.jsx'
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'react-hot!babel'
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: __dirname + '/public',
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './public',
    hot: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};

//finds the index.js entry and builds it into a dist/bundle.js bundle
