import React from "react";
import { render } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { RouteScrollManager } from "./RouteScrollManager";

let currentLocation = "/";
const setLocation = vi.fn();

vi.mock("wouter", () => ({
  useLocation: () => [currentLocation, setLocation],
}));

describe("RouteScrollManager", () => {
  beforeEach(() => {
    currentLocation = "/";
    window.history.replaceState({}, "", "/");
    window.scrollTo = vi.fn();
  });

  it("starts a newly navigated page at the top", () => {
    const { rerender } = render(<RouteScrollManager />);

    currentLocation = "/product";
    rerender(<RouteScrollManager />);

    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, left: 0, behavior: "auto" });
  });

  it("restores the recorded position after browser history navigation", () => {
    const { rerender } = render(<RouteScrollManager />);

    window.history.replaceState({ __sunexScrollY: 486 }, "", "/");
    window.dispatchEvent(new PopStateEvent("popstate"));
    currentLocation = "/about";
    rerender(<RouteScrollManager />);

    expect(window.scrollTo).toHaveBeenCalledWith({ top: 486, left: 0, behavior: "auto" });
  });
});
