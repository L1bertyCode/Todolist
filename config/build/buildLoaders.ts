import { RuleSetRule } from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
export function buildLoaders(
 isDev: boolean
): RuleSetRule[] {
 const tsLoader = {
  test: /\.tsx?$/,
  use: "ts-loader",
  exclude: /node_modules/,
 };
 const cssLoader = {
  test: /\.css$/i,
  use: [
   isDev ? "style-loader" : MiniCssExtractPlugin.loader,
   {
    loader: "css-loader",
    options: {
     modules: {
      namedExport: false,
      exportLocalsConvention: "as-is",
      auto: /\.module\.\w+$/i,
      localIdentName: isDev
       ? "[path][name]__[local]--[hash:base64:5]"
       : "[base64:8]",
     },
    },
   },
  ],
 };
 const babelLoader = {
  test: /\.m?js$/,
  exclude: /node_modules/,
  use: {
   loader: "babel-loader",
   options: {
    presets: ["@babel/preset-env"],
   },
  },
 };

 return [tsLoader, babelLoader, cssLoader];
}
