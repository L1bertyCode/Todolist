import path from "path";
import {
 BuildEnv,
 BuildPath,
} from "./config/build/types/config";

import { buildWebpackConfig } from "./config/build/buildWebpackConfig";

export default (env: BuildEnv) => {
 const PORT = env.port || 3000;
 const mode = env.mode || "development";
 const isDev = mode === "development";

 const paths: BuildPath = {
  entry: path.resolve(__dirname, "src", "index.tsx"),
  output: path.resolve(__dirname, "dist"),
  template: path.resolve(__dirname, "public", "index.html"),
  favicon: path.resolve(__dirname, "public", "favicon.ico"),
 };

 const config = buildWebpackConfig({
  mode,
  paths,
  port: PORT,
  isDev,
 });
 return config;
};
