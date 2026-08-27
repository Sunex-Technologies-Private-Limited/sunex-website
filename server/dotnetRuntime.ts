import { spawn, type ChildProcess } from "node:child_process";
import { existsSync } from "node:fs";
import path from "node:path";

const apiBaseUrl = () => (process.env.SUNEX_API_URL || "http://127.0.0.1:5090").replace(/\/$/, "");
let child: ChildProcess | undefined;

export function isDotnetApiEnabled(): boolean {
  return process.env.SUNEX_DOTNET_API_ENABLED === "true" || process.env.NODE_ENV === "production";
}

async function waitForLiveness(attempts = 40): Promise<void> {
  for (let attempt = 0; attempt < attempts; attempt++) {
    try {
      const response = await fetch(`${apiBaseUrl()}/internal/health/live`, { signal: AbortSignal.timeout(1_000) });
      if (response.ok) return;
    } catch {
      // The service may still be compiling or starting.
    }
    await new Promise(resolve => setTimeout(resolve, 250));
  }
  throw new Error("The SunEx .NET API did not become healthy in time.");
}

export async function startDotnetApi(projectRoot: string): Promise<void> {
  if (!isDotnetApiEnabled()) return;
  if (process.env.SUNEX_DOTNET_API_MANAGED === "external") {
    await waitForLiveness();
    return;
  }

  const project = path.join(projectRoot, "backend-dotnet", "Sunex.Api", "Sunex.Api.csproj");
  if (!existsSync(project)) throw new Error("The SunEx .NET API project is missing.");

  child = spawn("dotnet", ["run", "--project", project, "--no-launch-profile"], {
    cwd: projectRoot,
    env: { ...process.env, ASPNETCORE_ENVIRONMENT: process.env.NODE_ENV === "production" ? "Production" : "Development", SUNEX_API_BIND: apiBaseUrl() },
    stdio: "inherit",
  });
  child.on("exit", code => console.warn(`[SunEx .NET API] exited with code ${code ?? "unknown"}.`));
  await waitForLiveness();
}

export function stopDotnetApi(): void {
  if (child && !child.killed) child.kill("SIGTERM");
}
