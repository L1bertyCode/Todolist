export type BuildMode = "production" | "development";

export interface BuildEnv {
 port: number;
 mode: BuildMode;
}
export interface BuildPath {
 entry: string;
 output: string;
 template: string;
 favicon: string;
}
export interface BuildOptions {
 paths: BuildPath;
 mode: BuildMode;
 port: number;
 isDev: boolean;
}
