import fs from "node:fs";
import path from "node:path";
import { Express } from "express";

export function resolveBundledStorageAssetPath(key: string, storageRoot: string) {
  if (!key || key.includes("..") || path.isAbsolute(key)) return null;
  const root = path.resolve(storageRoot);
  const candidate = path.resolve(root, key);
  return candidate.startsWith(`${root}${path.sep}`) ? candidate : null;
}

function getBundledStorageRoot() {
  return process.env.NODE_ENV === "production"
    ? path.resolve(import.meta.dirname, "public", "manus-storage")
    : path.resolve(import.meta.dirname, "..", "..", "client", "public", "manus-storage");
}

export function buildStoragePresignUrl(forgeApiUrl: string, storageKey: string) {
  const forgeUrl = new URL("v1/storage/presign/get", forgeApiUrl.replace(/\/+$/, "") + "/");
  forgeUrl.searchParams.set("path", storageKey);
  return forgeUrl.toString();
}

export function registerStorageProxy(app: Express) {
  app.use("/manus-storage", async (req, res) => {
    const storageKey = (req.url ?? "").split("?")[0]?.replace(/^\/+/, "");
    const forgeApiUrl = process.env.BUILT_IN_FORGE_API_URL;
    const forgeApiKey = process.env.BUILT_IN_FORGE_API_KEY;

    if (!storageKey) {
      res.status(400).type("text/plain").send("Missing storage key");
      return;
    }

    const bundledAsset = resolveBundledStorageAssetPath(storageKey, getBundledStorageRoot());
    if (bundledAsset && fs.existsSync(bundledAsset)) {
      res.set("Cache-Control", "public, max-age=31536000, immutable");
      res.sendFile(bundledAsset);
      return;
    }
    if (!forgeApiUrl || !forgeApiKey) {
      res.status(500).type("text/plain").send("Storage proxy not configured");
      return;
    }

    try {
      const upstream = await fetch(buildStoragePresignUrl(forgeApiUrl, storageKey), {
        headers: { Authorization: `Bearer ${forgeApiKey}` },
      });
      if (!upstream.ok) {
        res.status(502).type("text/plain").send("Storage backend error");
        return;
      }
      const { url } = await upstream.json() as { url?: string };
      if (!url) {
        res.status(502).type("text/plain").send("Storage backend error");
        return;
      }
      res.redirect(307, url);
    } catch {
      res.status(502).type("text/plain").send("Storage proxy error");
    }
  });
}
