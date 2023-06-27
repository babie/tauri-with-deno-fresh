import * as esbuild from "esbuild";
import { denoPlugins } from "esbuild-deno-loader";
import { posix } from "$std/path/mod.ts";

const options: esbuild.BuildOptions = {
  entryPoints: [posix.resolve("main.ts")],
  bundle: true,
  format: "esm",
  outdir: posix.resolve("build"),
  minify: true,
  sourcemap: "external",
  plugins: [
    ...denoPlugins(),
  ],
};

await esbuild.build(options);

esbuild.stop();
