# Backend Architecture

The server-side of the Sunex Website relies on a hybrid model using a Node.js TRPC server and an optional .NET 8 API. 

## The Node ↔ .NET Bridge (`dotnetRuntime.ts`)

> [!IMPORTANT]
> **Understanding the Bridge:** If you are new to the project, the most complex piece of the backend is how Node and .NET communicate. We do *not* run them as completely disconnected microservices in local development. 

Instead, the Node.js process acts as a host and reverse proxy for the .NET API.
1. When you run the Node development server (`pnpm run dev:server`), the `dotnetRuntime.ts` utility is invoked.
2. It uses `node:child_process` to spawn the `dotnet run` command pointing to `Sunex.Api.csproj`.
3. Node repeatedly polls the `.NET` health check endpoint (`/internal/health/live`) until the .NET server returns a 200 OK.
4. Once healthy, Node's TRPC routers can forward heavy/legacy tasks to `.NET` via internal HTTP calls to `http://127.0.0.1:5090`.

*Note:* In production (e.g., inside our Docker container), we set `SUNEX_DOTNET_API_MANAGED=external` to prevent Node from trying to spawn the process, as our `start-production.sh` script handles spinning them both up.

## TRPC Implementation (`/server/routers.ts`)

All standard CRUD and frontend interactions go through TRPC.
- **Procedures:** Endpoints are defined using TRPC's `publicProcedure` or `protectedProcedure`.
- **Validation:** Every input must be strictly typed using `zod`. This ensures invalid data never hits our business logic and automatically infers TypeScript types for the frontend.

## Error Handling & Logging Conventions

Consistent error handling is critical for both the client experience and debugging.

- **Never throw generic Errors:** Inside TRPC routers, always throw a `TRPCError`. This ensures the client receives a structured JSON error response instead of an internal server crash.
  ```typescript
  throw new TRPCError({
    code: 'BAD_REQUEST',
    message: 'The provided email is invalid.',
  });
  ```
- **Logging:** We use `pino` (as defined in `package.json`). Do not use `console.log` in production code. Use the standard logger instance so logs are properly formatted as JSON for our monitoring tools.
- **.NET Errors:** When the Node server proxies a request to .NET and it fails, the Node server catches the HTTP error, parses the .NET error message, and wraps it in a `TRPCError` with a `INTERNAL_SERVER_ERROR` or `BAD_REQUEST` code before sending it to the client.

## Authentication & Storage

- **Auth:** The system utilizes secure HTTP-only cookies and JWTs (`jose`). Authentication logic lives in the Node layer.
- **Storage:** File uploads (e.g., images) bypass the .NET server and are handled by Node using `@aws-sdk/client-s3`. Node generates presigned URLs for direct-to-S3 uploads to reduce server load.
