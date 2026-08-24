import { Express } from "express";

export function registerStorageProxy(app: Express) {
  // Mock storage proxy
  app.use("/storage", (req, res) => res.send("Storage Proxy"));
}
