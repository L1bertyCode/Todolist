import path from "path";
import { Configuration } from "webpack";
import { BuildOptions } from "./types/config";
import { buildPlugins } from "./buildPlugins";
import { buildLoaders } from "./buildLoaders";
import { buildResolvers } from "./buildResolvers";
import { buildDevServer } from "./buildDevServer";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
export function buildWebpackConfig(
 options: BuildOptions
): Configuration {
 const { mode, paths, isDev } = options;
 return {
  mode,
  entry: paths.entry,
  output: {
   filename: "[name].[contenthash].js",
   path: paths.output,
   clean: true,
  },
  plugins: buildPlugins(paths),
  module: {
   rules: buildLoaders(isDev),
  },
  resolve: buildResolvers(),
  devtool: isDev ? "inline-source-map" : undefined,
  devServer: isDev ? buildDevServer(options) : undefined,
  optimization: {
   minimizer: [new CssMinimizerPlugin()],
  },
 };
}
