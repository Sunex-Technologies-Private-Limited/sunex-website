import { Express } from "express";

export function registerOAuthRoutes(app: Express) {
  // Mock OAuth routes
  app.get("/auth/login", (req, res) => res.send("OAuth Login"));
  app.get("/auth/callback", (req, res) => res.send("OAuth Callback"));
}
