# Sunex Website #

A modern, full-stack application built with React, Vite, Node.js, and an optional .NET backend. This project utilizes an extensive suite of cutting-edge web technologies to deliver a robust, performant, and scalable solution.

## 🚀 Tech Stack

- **Frontend:** React 19, Vite, TailwindCSS (v4), Framer Motion, Radix UI, Lucide React
- **Backend:** Express.js (Node), TRPC, optional .NET API
- **Database:** Prisma, Drizzle ORM, MySQL
- **Tooling:** TypeScript, Prettier, pnpm
- **Testing:** Vitest, React Testing Library

## 📁 Project Structure

The repository is organized to follow industry standard modularity:

- `/client` - Frontend React application (components, pages, styles)
- `/server` - Node.js Express backend and TRPC routers
- `/backend-dotnet` - Optional .NET API backend implementation
- `/shared` - Shared types, schemas, and utilities between client and server
- `/docs` - Project documentation, planning, and notes
- `/drizzle` & `/prisma` - Database schemas, migrations, and ORM configurations

## 🛠️ Prerequisites

Ensure you have the following installed on your local development machine:

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [pnpm](https://pnpm.io/) (v10+)
- [.NET SDK](https://dotnet.microsoft.com/) (optional, if using the .NET backend)

## 📦 Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd sunex-app
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

## 💻 Local Development

This project provides several scripts for different development environments.

**Option 1: Standard Full-Stack (Node.js + React)**
Start the Vite frontend development server:
```bash
pnpm run dev
```

In a separate terminal, start the Node.js backend:
```bash
pnpm run dev:server
```

**Option 2: .NET Backend Environment**
If you wish to run the .NET API alongside the frontend:
```bash
pnpm run dev:dotnet
```

## 🏗️ Build & Production

To build the application for production:

```bash
pnpm run build
```
This command bundles both the frontend (via Vite) and the Node.js backend (via esbuild).

To start the production server:
```bash
pnpm run start
```

## 🧪 Testing

Run the Vitest test suite:
```bash
pnpm run test
```

Run the .NET tests (if applicable):
```bash
pnpm run test:dotnet
```

## 🗄️ Database Management

Validate the Prisma configuration:
```bash
pnpm run prisma:validate
```

Push schema changes to the database via Drizzle:
```bash
pnpm run db:push
```

## 📝 Documentation & Notes

All documentation, environment references, architecture plans, and miscellaneous notes have been consolidated into the [`/docs`](./docs) folder for easy reference.
