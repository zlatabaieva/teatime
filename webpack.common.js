const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackPartialsPlugin = require('html-webpack-partials-plugin')

const webpack = require('webpack')
const path = require('path')

module.exports = {
  entry: {
    index: './src/index.js'
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'docs')
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['@babel/plugin-proposal-class-properties']
          }
        }
      },
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          }
        }
      },
      {
        test: /\.scss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [['postcss-preset-env']]
              }
            }
          }
        ]
      },
      {
        test: /\.html$/i,
        loader: 'html-loader'
      },
      {
        resourceQuery: /raw/,
        type: 'asset/source'
      },
      {
        test: /\.png/,
        type: 'asset/resource',
        generator: {
          filename: 'images/[hash][ext][query]'
        }
      },
      {
        test: /\.svg/,
        type: 'asset/resource',
        generator: {
          filename: 'images/[hash][ext][query]'
        }
      },
      {
        test: /\.(ttf|otf|woff|woff2)$/i,
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[ext]'
        }
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].[contenthash].css'
    }),

    // Index
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: './index.html'
    }),

    // Section
    new HtmlWebpackPlugin({
        template: './src/articles.html',
        filename: './articles.html'
      }),

      new HtmlWebpackPlugin({
        template: './src/typesoftee.html',
        filename: './typesoftee.html'
      }),

      new HtmlWebpackPlugin({
        template: './src/media.html',
        filename: './media.html'
      }),

    // Filtr
       new HtmlWebpackPlugin({
        template: './src/articles/podborki.html',
        filename: './articles/podborki.html'
      }),

      new HtmlWebpackPlugin({
        template: './src/articles/sovety.html',
        filename: './articles/sovety.html'
      }),

      new HtmlWebpackPlugin({
        template: './src/articles/rezepty.html',
        filename: './articles/rezepty.html'
      }),

      new HtmlWebpackPlugin({
        template: './src/typesoftee/ferm.html',
        filename: './typesoftee/ferm.html'
      }),

      new HtmlWebpackPlugin({
        template: './src/typesoftee/region.html',
        filename: './typesoftee/region.html'
      }),

      new HtmlWebpackPlugin({
        template: './src/typesoftee/deystvie.html',
        filename: './typesoftee/deystvie.html'
      }),

      new HtmlWebpackPlugin({
        template: './src/media/news.html',
        filename: './media/news.html'
      }),

      new HtmlWebpackPlugin({
        template: './src/media/mesta.html',
        filename: './media/mesta.html'
      }),

    // Article
      new HtmlWebpackPlugin({
      template: './src/typesoftee/ferm/black.html',
      filename: './typesoftee/ferm/black.html'
      }),


    // Partials
    new HtmlWebpackPartialsPlugin([
      {
        path: path.join(__dirname, './src/partials/analytics.html'),
        location: 'analytics',
        template_filename: '*',
        priority: 'replace'
      }
    ])
  ],
  optimization: {
    minimizer: [new CssMinimizerPlugin()]
  }
}