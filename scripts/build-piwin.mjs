// Build self-contained piwin extension bundles from the TypeScript source.
//
// piwin loads extensions from an immutable, staged package directory and never
// runs `npm install` for them, so every non-pi dependency must be inlined. Only
// the pi SDK packages stay external (they are provided by the host runtime).
//
// Mirrors piwin-kiro-provider's approach: esbuild bundle, ESM output, a
// `require` shim banner, and the pi SDK marked external.
import { mkdirSync } from "node:fs";
import { build } from "esbuild";

const externals = [
  "@earendil-works/pi-ai",
  "@earendil-works/pi-coding-agent",
  "@earendil-works/pi-tui",
];

// esbuild's `__require` interop shim reads a module-scoped `require`; the banner
// provides one so any bundled CommonJS that still needs `require` at runtime
// (node builtins, optional deps) can resolve it.
const banner = {
  js: "import{createRequire as __antigravityCreateRequire}from'node:module';const require=__antigravityCreateRequire(import.meta.url);",
};

const entries = [
  { in: "src/index.ts", out: "piwin/index.ts" },
  { in: "src/features/google-search.ts", out: "piwin/google-search.ts" },
  { in: "src/features/generate-image.ts", out: "piwin/generate-image.ts" },
];

mkdirSync("piwin", { recursive: true });

for (const { in: entry, out } of entries) {
  await build({
    entryPoints: [entry],
    outfile: out,
    bundle: true,
    platform: "node",
    format: "esm",
    target: "node22",
    external: externals,
    banner,
    logLevel: "info",
  });
}

console.log("piwin bundles written.");
