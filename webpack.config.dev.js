const webpack = require("webpack");
const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");

// this is imp for babel plugin toknow which development we are working in
process.env.NODE_ENV = "development";

module.exports = {
  mode: "development", // knows its development, disable production only features
  target: "web", // this target will be supported in web
  devtool: "cheap-module-source-map", //source map will let us see origin code that have written for debugging in the browser
  entry: "./src/index", // this is default. added for clarity
  output: {
    path: path.resolve(__dirname, "build"), // required as webpack has to know where it is storing the info. But for development in will be in memory
    publicPath: "/", // this specifies public url
    filename: "bundle.js" // physical file wont be generated. but this is needed for webpack as it references the html that is being generated from the web pack
  },
  devServer: {
    stats: "minimal", // minimal wont generate lot of noise in command line
    overlay: true, // over lay any errors generated in browser
    historyApiFallback: true, // all request will be sent to index.html
    // the below three are necessary due to open issue with chrome aboiut CORS
    disableHostCheck: true,
    headers: { "Access-Control-Allow-Origin": "*" },
    https: false
  },
  plugins: [
    // it accepts an object to configure our plugin
    new HtmlWebPackPlugin({
      // template is tell the webpack where to find the html template
      template: "src/index.html",
      favicon: "src/favicon.ico"
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
        use: ["babel-loader"]
      },
      {
        test: /(\.css)$/,
        // for css we use two different loaders. the combination of these
        // two loader will let us import css just like we do in javascript and webpack will bundle all the css into a single file
        use: ["style-loader", "css-loader"]
      }
    ]
  }
};
