import { mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";

const projectRoot = path.resolve(import.meta.dirname, "..");
const sourceRoots = [path.join(projectRoot, "client")];
const sourceExtensions = new Set([".ts", ".tsx", ".html", ".css"]);
const managedAssetPattern = /\/manus-storage\/([^"'\s?)]+)/g;

async function listSourceFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(entries.map(async entry => {
    const candidate = path.join(directory, entry.name);
    if (entry.isDirectory()) return listSourceFiles(candidate);
    return sourceExtensions.has(path.extname(entry.name)) ? [candidate] : [];
  }));
  return files.flat();
}

async function collectManagedAssetKeys() {
  const files = (await Promise.all(sourceRoots.map(listSourceFiles))).flat();
  const keys = new Set();
  for (const file of files) {
    const content = await readFile(file, "utf8");
    for (const match of content.matchAll(managedAssetPattern)) {
      const key = decodeURIComponent(match[1]);
      if (!key.includes("..") && !key.includes("$") && !path.isAbsolute(key)) keys.add(key);
    }
  }
  return [...keys].sort();
}

function getRequiredSourceOrigin() {
  const value = process.env.SUNEX_ASSET_SOURCE_URL;
  if (!value) throw new Error("Set SUNEX_ASSET_SOURCE_URL to the published website origin before exporting assets.");
  return new URL(value).origin;
}

async function exportAsset(sourceOrigin, outputDirectory, key) {
  const sourceUrl = new URL(`/manus-storage/${encodeURIComponent(key)}`, sourceOrigin).toString();
  const response = await fetch(sourceUrl, { redirect: "follow" });
  if (!response.ok) throw new Error(`Could not download ${key}: HTTP ${response.status}.`);
  const outputPath = path.join(outputDirectory, key);
  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, Buffer.from(await response.arrayBuffer()));
}

const assetKeys = await collectManagedAssetKeys();
if (process.argv.includes("--manifest-only")) {
  console.log(JSON.stringify({ assetCount: assetKeys.length, assets: assetKeys }, null, 2));
  process.exit(0);
}

const sourceOrigin = getRequiredSourceOrigin();
const outputDirectory = path.resolve(process.env.SUNEX_LOCAL_ASSET_DIR || path.join(projectRoot, "local-assets"));
await rm(outputDirectory, { recursive: true, force: true });
await mkdir(outputDirectory, { recursive: true });
for (const key of assetKeys) await exportAsset(sourceOrigin, outputDirectory, key);
await writeFile(path.join(outputDirectory, "asset-manifest.json"), JSON.stringify({ sourceOrigin, exportedAt: new Date().toISOString(), assetCount: assetKeys.length, assets: assetKeys }, null, 2));
console.log(`Exported ${assetKeys.length} managed assets to ${outputDirectory}.`);
