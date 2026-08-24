# Frontend Architecture

The frontend of the Sunex Website is a Single Page Application (SPA) built using React 19 and Vite.

## Tech Stack Overview

-   **Framework:** React 19
-   **Bundler:** Vite (fast HMR, optimized builds)
-   **Routing:** `wouter` (minimalist, hook-based routing)
-   **Styling:** TailwindCSS (v4)
-   **UI Components:** Radix UI (accessible primitives) & custom implementations (shadcn-like)
-   **State & Data Fetching:** React Query (via TRPC) and standard React Contexts
-   **Animations:** Framer Motion

## Directory Structure (`/client/src`)

The `/client/src` directory is organized by feature and function:

-   `/components` - Reusable UI components. Often split into `ui` (dumb, styled primitives like Buttons, Inputs) and complex feature-specific components.
-   `/contexts` - React Context providers for global UI state (e.g., Theme, Auth State).
-   `/hooks` - Custom React hooks for shared logic.
-   `/pages` - Top-level route components. Each file here typically corresponds to a distinct URL path in the application.
-   `/lib` - Utility functions, API helpers, and constants.

## Styling Guidelines (Tailwind + Radix)

We rely heavily on TailwindCSS for styling to keep our CSS footprint minimal and our components co-located.

-   **Tailwind:** Use utility classes for all layout, spacing, and typography.
-   **Radix UI:** For complex interactive components (Dialogs, Dropdowns, Accordions), we use Radix UI primitives. These provide accessibility (WAI-ARIA) and keyboard navigation out of the box. We then style these primitives using Tailwind.
-   **`index.css`:** Contains global resets, custom fonts, and root CSS variables (often used for theming). Avoid writing arbitrary CSS classes here unless absolutely necessary.

## State Management

1.  **Server State:** We do *not* use Redux or Zustand for server state. Instead, we rely entirely on **TRPC + React Query**. Data fetching, caching, synchronization, and invalidation are handled by React Query's `useQuery` and `useMutation` hooks.
2.  **Client State:** For local, ephemeral UI state (like opening a modal), we use standard React `useState`.
3.  **Global UI State:** For global preferences (like dark mode or the currently logged-in user profile), we use React Context (`/contexts`).

## Routing

We use `wouter` instead of React Router. `wouter` is smaller, hook-based, and avoids massive configuration objects. 

**Standard Pattern:**
Routes are typically defined at the root of the app (e.g., in `App.tsx` or `main.tsx`) using `<Route path="/some-path" component={SomePage} />`.
