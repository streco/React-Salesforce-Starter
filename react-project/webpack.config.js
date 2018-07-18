var webpack = require('webpack');

module.exports = {
  entry: [
    './src/index.js'
  ],
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js'
  },
  /*
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin()
    ],
  */
  module: {
    loaders: [{
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['react', 'es2015', 'stage-1']
      }
    },
  { test: /\.css$/, loader: 'style-loader!css-loader' },
  {
    test: /\.(svg|gif|jpe?g|png)$/,
    loader: 'url-loader?limit=10000'
},
{
    test: /\.(eot|woff|woff2|ttf)$/,
    loader: 'url-loader?limit=30&name=assets/fonts/webfonts/[name].[ext]'
}




]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './',
        disableHostCheck: true
  }
};
