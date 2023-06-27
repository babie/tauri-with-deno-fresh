import {
  ImportMap,
  resolveImportMap,
  resolveModuleSpecifier,
} from "https://deno.land/x/importmap@0.2.1/mod.ts";

const importMap: ImportMap = {
  imports: {
    "./foo/": "./bar/",
    "$fresh/": "https://deno.land/x/fresh@1.2.0/",
    "@preact/signals": "https://esm.sh/*@preact/signals@1.1.3",
    "@preact/signals-core": "https://esm.sh/*@preact/signals-core@1.2.3",
    "$std/": "https://deno.land/std@0.190.0/",
  },
};
const importMapBaseURL = new URL(import.meta.url);
const resolvedImportMap = resolveImportMap(importMap, importMapBaseURL);
console.log("resolved importmap:");
console.dir(resolvedImportMap);

const moduleSpecifiers = [
  "./foo/test.js",
  "$fresh/server.ts",
  "@preact/signals",
  "@preact/signals-core",
  "$std/dotenv/load.ts",
];
const baseURL = new URL(import.meta.url);
console.log("resolved module specifiers:");
for (const moduleSpecifier of moduleSpecifiers) {
  const resolvedModuleSpecifier = resolveModuleSpecifier(
    moduleSpecifier,
    resolvedImportMap,
    baseURL,
  );
  console.log(`${moduleSpecifier} -> ${resolvedModuleSpecifier}`);
}
