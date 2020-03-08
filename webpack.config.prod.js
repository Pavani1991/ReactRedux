const webpack = require("webpack");
const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpackBundleAnalyzer = require("webpack-bundle-analyzer");

// this is imp for babel plugin toknow which development we are working in
process.env.NODE_ENV = "production";

module.exports = {
  mode: "production", // knows its development, disable production only features
  target: "web", // this target will be supported in web
  devtool: "source-map", //source map will let us see origin code that have written for debugging in the browser
  entry: "./src/index", // this is default. added for clarity
  output: {
    path: path.resolve(__dirname, "build"), // required as webpack has to know where it is storing the info. But for development in will be in memory
    publicPath: "/", // this specifies public url
    filename: "bundle.js" // physical file wont be generated. but this is needed for webpack as it references the html that is being generated from the web pack
  },
  plugins: [
    // displayes whats in the bundle
    new webpackBundleAnalyzer.BundleAnalyzerPlugin({ analyzerMode: "static" }),

    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css"
    }),
    new webpack.DefinePlugin({
      // This global makes sure React is built in prod mode.
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
      "process.env.API_URL": JSON.stringify("http://localhost:3001")
    }),
    // it accepts an object to configure our plugin
    new HtmlWebPackPlugin({
      // template is tell the webpack where to find the html template
      template: "src/index.html",
      favicon: "src/favicon.ico",
      minify: {
        // see https://github.com/kangax/html-minifier#options-quick-reference
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    })
  ],
  module: {
    // we tell webbpack what files to handle by specifying rules
    rules: [
      {
        // this is for javascript, how to find our javascript files
        test: /\.(js|jsx)$/,
        // as we don't need to process any file sin node_modules
        exclude: /node_modules/,
        // to tell webpack what to do with these javascript files.
        // we want to run babel on the files, for which we need babel-loader
        use: ["babel-loader", "eslint-loader"] // these rules are processed bottom to top. first eslint will be loaded next babel is loaded
      },
      {
        test: /(\.css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          },
          {
            loader: "postcss-loader",
            options: {
              plugins: () => [require("cssnano")],
              sourceMap: true
            }
          }
        ]
      }
    ]
  }
};
