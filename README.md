# Sunex Website

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![React](https://img.shields.io/badge/React-19-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-7-purple?logo=vite)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)

> A modern, full-stack web application developed by **Sunex Technologies Private Limited**.

This project utilizes an extensive suite of cutting-edge web technologies to deliver a robust, performant, and scalable solution. Built with React, Vite, Node.js, and offering an optional .NET backend architecture.

---

## 📑 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Local Development](#-local-development)
- [Database Management](#-database-management)
- [Build & Production](#-build--production)
- [Testing](#-testing)
- [Documentation](#-documentation)
- [License](#-license)

---

## ✨ Features

- **Modern User Interface:** Built with React 19, Tailwind CSS v4, and Framer Motion for fluid animations.
- **Accessible Components:** Utilizing Radix UI for highly accessible and customizable components.
- **Type-Safe API:** End-to-end type safety with tRPC and TypeScript.
- **Flexible Backend Architecture:** Support for both Node.js (Express) and an optional .NET API backend.
- **Robust ORM Support:** Integrated with both Prisma and Drizzle ORM for efficient database operations.
- **Comprehensive Testing:** Configured with Vitest and React Testing Library to ensure code reliability.

## 🚀 Tech Stack

### Frontend
- **Framework:** React 19, Vite
- **Styling & UI:** TailwindCSS (v4), Radix UI, Framer Motion, Lucide React
- **State Management:** React Query (via tRPC)

### Backend
- **Node API:** Express.js, tRPC
- **Alternative API:** .NET (Optional)

### Database
- **Databases:** MySQL
- **ORMs:** Prisma, Drizzle ORM

### Tooling & Testing
- **Language:** TypeScript
- **Package Manager:** pnpm
- **Testing:** Vitest, React Testing Library

---

## 📁 Project Structure

The repository follows an industry-standard monorepo-style modularity:

```text
sunex-rivr/
├── client/          # Frontend React application (components, pages, styles)
├── server/          # Node.js Express backend and TRPC routers
├── backend-dotnet/  # Optional .NET API backend implementation
├── shared/          # Shared types, schemas, and utilities
├── docs/            # Project documentation, planning, and notes
├── drizzle/         # Drizzle ORM configurations and migrations
└── prisma/          # Prisma database schema and migrations
```

---

## 🏁 Getting Started

### Prerequisites

Ensure you have the following installed on your local development machine:

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [pnpm](https://pnpm.io/) (v10+)
- [.NET SDK](https://dotnet.microsoft.com/) (Optional, if using the .NET backend)
- A running instance of MySQL

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd sunex-rivr
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Environment Setup:**
   Ensure you have a `.env` file configured in the root directory based on your requirements.
   *(Update the `.env` file with your database credentials and API keys.)*

---

## 💻 Local Development

This project provides several scripts for different development environments.

### Option 1: Standard Full-Stack (Node.js + React)

Start the Vite frontend development server:
```bash
pnpm run dev
```

In a separate terminal, start the Node.js backend:
```bash
pnpm run dev:server
```

### Option 2: .NET Backend Environment

If you wish to run the .NET API alongside the frontend:
```bash
pnpm run dev:dotnet
```

---

## 🗄️ Database Management

Validate the Prisma configuration:
```bash
pnpm run prisma:validate
```

Push schema changes to the database via Drizzle:
```bash
pnpm run db:push
```

---

## 🏗️ Build & Production

To build the application for production:

```bash
pnpm run build
```
*This command bundles both the frontend (via Vite) and the Node.js backend (via esbuild).*

To start the production server:
```bash
pnpm run start
```

---

## 🧪 Testing

Run the Vitest test suite for the Node/React codebase:
```bash
pnpm run test
```

Run the .NET tests (if applicable):
```bash
pnpm run test:dotnet
```

---

## 📝 Documentation

All documentation, environment references, architecture plans, and miscellaneous notes have been consolidated into the [`/docs`](./docs) folder for easy reference.

---

## 📄 License

This project is licensed under the MIT License.

---
*© 2026 Sunex Technologies Private Limited. All Rights Reserved.*
