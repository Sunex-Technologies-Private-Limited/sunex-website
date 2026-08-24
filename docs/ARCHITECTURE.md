# System Architecture

The Sunex Website is a robust, full-stack application leveraging a modern hybrid backend model. It is designed to be highly scalable, using React for the frontend and a dual-layer backend architecture (Node.js and .NET).

## High-Level System Overview

The architecture is divided into three primary layers:
1.  **Client (Frontend):** A Single Page Application (SPA) built with React and Vite.
2.  **Server (Backend Proxy & Logic):** A Node.js/Express server utilizing TRPC for end-to-end type safety.
3.  **Core Services (.NET API):** An optional but tightly integrated .NET Core backend handling computationally heavy tasks and core domain logic.
4.  **Database:** MySQL relational database.

### System Diagram

```mermaid
graph TD
    Client[React/Vite Frontend] <-->|TRPC (JSON)| Node[Node.js / Express Server]
    Node <-->|Drizzle ORM / Prisma| DB[(MySQL Database)]
    Node <-->|Internal HTTP / gRPC| DotNet[.NET 8 API Core]
    DotNet <-->|EF Core / ADO.NET| DB
```

## Data Flow
1.  The **React Client** initiates a request using React Query wrappers around TRPC hooks.
2.  The **Node.js TRPC Router** receives the request. It performs validation using Zod.
3.  Depending on the endpoint:
    -   *Standard Operations:* The Node.js server executes business logic and interacts directly with the MySQL database using Drizzle ORM or Prisma.
    -   *Complex Domain Logic:* The Node.js server bridges the request to the local **.NET API**, acting as a reverse proxy. The .NET backend executes the operation and returns the result to Node, which forwards it to the client.

## Architecture Decision Record (ADR): Why Node.js and .NET Coexist

> [!IMPORTANT]
> **Context:** A common question for new developers is "Why are we running two backends?"

**Decision:** We run Node.js (with TRPC) and .NET 8 concurrently in the same environment.

**Reasoning:**
-   **Node.js & TRPC:** Provides unparalleled developer experience and end-to-end type safety for the frontend. We can share TypeScript types (`/shared` folder) directly between the database schema, the API boundaries, and the React components without code generation steps. It handles lightweight CRUD, authentication bridging, and rapid prototyping beautifully.
-   **.NET 8:** Used for heavy lifting, legacy integrations, and complex domain-driven design logic where raw execution speed, multi-threading, or C# ecosystem libraries are strictly required.

By running them together (managed via a shared Docker environment), we get the agility of TypeScript TRPC for 80% of endpoints, and the performance and enterprise patterns of .NET for the remaining 20%.
