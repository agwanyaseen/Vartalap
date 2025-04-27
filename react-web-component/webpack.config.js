const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  entry: "./ChatWidgetElement.js",
  output: {
    filename: "chat-widget.js",
    path: path.resolve(__dirname, "dist"),
    library: "ChatWidget",
    libraryTarget: "umd",
    globalObject: "this",
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.css$/i,
        // use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
        use: [
          "style-loader", // ✅ Use style-loader in development instead of MiniCssExtractPlugin
          "css-loader",
          "postcss-loader",
        ],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  devtool: "source-map",
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "chat-widget-styles.css",
    }),
    new webpack.DefinePlugin({
      "process.env.REACT_APP_API_ENDPOINT": JSON.stringify(process.env.REACT_APP_API_ENDPOINT),
    }),
  ],
  devServer: {
    static: {
      directory: path.resolve(__dirname), // Serve from root
    },
    historyApiFallback: true,
    compress: true,
    port: 5000,
    hot: true,
    open: true,
    watchFiles: ["./src/**/*"],
    devMiddleware: {
      writeToDisk: true, // ✅ Force Webpack Dev Server to write output to disk
    },
  },
};
