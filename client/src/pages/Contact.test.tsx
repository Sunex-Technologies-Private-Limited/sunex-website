import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import Contact from "./Contact";

vi.mock("wouter", () => ({
  Link: ({ children, href }: { children: React.ReactNode; href: string }) => <a href={href}>{children}</a>,
}));

vi.mock("@/components/sunex/PageHero", () => ({
  PageHero: ({ title }: { title: React.ReactNode }) => <div>{title}</div>,
}));

vi.mock("@/components/sunex/Reveal", () => ({
  Reveal: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

vi.mock("@/lib/trpc", () => ({
  trpc: {
    contact: {
      submit: {
        useMutation: () => ({ mutate: vi.fn(), error: null, isPending: false }),
      },
    },
  },
}));

describe("Contact locations", () => {
  afterEach(cleanup);

  it("shows the approved main, training, and coming-soon location statuses without an unconfirmed public e-mail", () => {
    render(<Contact />);

    expect(screen.getByText("Hassan")).toBeTruthy();
    expect(screen.getByText("Mysuru")).toBeTruthy();
    expect(screen.getByText("Bengaluru")).toBeTruthy();
    expect(screen.getByText(/1133\/D, Third Floor/i)).toBeTruthy();
    expect(screen.queryByText("contact@sunextech.com")).toBeNull();
  });
});
