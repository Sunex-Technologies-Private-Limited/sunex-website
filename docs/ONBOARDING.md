# Developer Onboarding

Welcome to the Sunex Website team! Follow these steps to get your local environment running.

## 1. Prerequisites
Ensure you have the following installed before starting:
- [Node.js](https://nodejs.org/) (v18+)
- [pnpm](https://pnpm.io/) (v10+)
- [Docker](https://www.docker.com/) (For local database setup)
- [.NET 8 SDK](https://dotnet.microsoft.com/) (If you need to run the `.NET` Core services locally)

## 2. Environment Setup
1. Clone the repository and `cd` into it.
2. Run `pnpm install`.
3. Copy `.env.example` to `.env` and fill in the required values (like your local database connection string).

## 3. Running Locally
Start the frontend and backend servers:
```bash
# Terminal 1: Frontend
pnpm run dev

# Terminal 2: Node.js Backend & TRPC
pnpm run dev:server
```

> [!TIP]
> **.NET Backend Setup:** By default, `pnpm run dev:server` uses mocked or Node-native fallback services for complex operations. If you need to test the `.NET` bridge specifically, run `pnpm run dev:dotnet` instead of `dev:server`.

## 4. Troubleshooting Common Local Failures

If you run into issues, check these frequent culprits:

- **Port Conflicts:** The Node API binds to `5000` by default. The .NET API binds to `5090`. If they fail to start, ensure no other services are using these ports (`lsof -i :5000`).
- **.NET Runtime Not Found:** If you see `Error: The SunEx .NET API did not become healthy in time`, double-check that `dotnet` is in your system PATH and you have installed the **.NET 8 SDK**, not just the runtime.
- **Environment Variables Typo:** If TRPC queries instantly fail with `UNAUTHORIZED` or `DATABASE_ERROR`, verify your `.env` file does not contain trailing spaces or missing values.
- **Drizzle / Prisma Desync:** If you get "Table not found" errors, you may need to sync your local database using `pnpm run db:push`.

## 5. Contribution Guidelines

We keep our Git workflow simple:
- **Branch Naming:** Prefix branches with `feature/` (e.g., `feature/user-auth`) or `fix/` (e.g., `fix/header-alignment`).
- **Commits:** Use [Conventional Commits](https://www.conventionalcommits.org/) (e.g., `feat: add login button`, `fix: correct padding on modal`).
- **Pull Requests:** All PRs require at least **1 reviewer** approval before merging into `main`.

---
> **For the maintainer:** 
> Has this guide been verified recently? If you are a new hire reading this and you got stuck, please open a PR to update this document immediately! Documentation is only useful if it accurately reflects a clean machine setup.
