const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");


module.exports = (env, argv) => {
  return {
    entry: ["@babel/polyfill", path.join(__dirname, "src/dapp")],
    output: {
      path: path.join(
        __dirname,
        argv.mode === "development" ? "dist/dapp" : "prod/dapp"
      ),
      filename: "bundle.js",
      publicPath: "/"
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          use: "babel-loader",
          exclude: /node_modules/
        },
        {
          test: /\.css$/,
          use: [
            "style-loader",
            "css-loader",
            {
              loader: "postcss-loader",
              options: {
                config: {
                  path: "./postcss.config.js",
                },
              },
            },
          ],
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "assets/img/[name].[ext]?[hash]"
              }
            }
          ]
        },
        {
          test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "assets/fonts/[name].[ext]"
              }
            }
          ]
        },
        {
          test: /\.html$/,
          use: "html-loader",
          exclude: /node_modules/
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(__dirname, "src/dapp/index.html")
      }),
      new FaviconsWebpackPlugin("src/dapp/assets/img/dappstarter.png"),
      // new MiniCssExtractPlugin()
    ],
    resolve: {
      extensions: [".js", ".jsx"]
    },
    devtool: "cheap-source-map",
    devServer: {
      contentBase: path.join(__dirname, "dapp"),
      port: 5001,
      host: "0.0.0.0",
      disableHostCheck: true,
      stats: "minimal",
      historyApiFallback: true,
      open: false,
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    }
  };
};
