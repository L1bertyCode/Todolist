import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

import {
 ProgressPlugin,
 WebpackPluginInstance,
} from "webpack";
import { BuildPath } from "./types/config";

export function buildPlugins(
 paths: BuildPath
): WebpackPluginInstance[] {
 return [
  new HtmlWebpackPlugin({
   template: paths.template,
   favicon: paths.favicon,
  }),
  new ProgressPlugin(),
  new MiniCssExtractPlugin({
   filename: "css/[name].[contenthash:8].css",
   chunkFilename: "css/[name].[contenthash:8].css",
  }),
 ];
}
