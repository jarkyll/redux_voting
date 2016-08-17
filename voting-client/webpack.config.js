module.exports = {
 entry: [
  './src/index.js'
  ],
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './dist'
  }
};

//finds the index.js entry and builds it into a dist/bundle.js bundle
