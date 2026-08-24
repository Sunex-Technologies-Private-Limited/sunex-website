import { Express } from "express";

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
