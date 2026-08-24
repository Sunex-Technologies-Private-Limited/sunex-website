import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import Product from "./Product";

vi.mock("wouter", () => ({
  Link: ({ children, href, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => <a href={href} {...props}>{children}</a>,
}));

vi.mock("@/components/sunex/PageHero", () => ({
  PageHero: ({ image }: { image: string }) => <div data-testid="page-hero" data-image={image} />,
}));

vi.mock("@/components/sunex/Reveal", () => ({
  Reveal: ({ children, className }: { children: React.ReactNode; className?: string }) => <div className={className}>{children}</div>,
}));

afterEach(cleanup);

describe("UrbanTree purification selector", () => {
  it("keeps the system-status caption inside the dedicated readable image panel", () => {
    render(<Product />);

    expect(screen.getByText("System status").closest(".product-system__media")).not.toBeNull();
    expect(screen.getByText("System status").parentElement?.className).toContain("image-panel__float");
    expect(screen.getByText("System status").parentElement?.className).toContain("image-panel__float--product");
  });

  it("synchronizes the selected device callout with its explanatory stage", () => {
    const { container } = render(<Product />);
    const uvModule = screen.getByRole("button", { name: "View UV Chamber" });

    expect(screen.getByTestId("page-hero").getAttribute("data-image")).toBe("/manus-storage/urbantree-city-clean_b9b26676.png");
    expect(screen.getByRole("img", { name: "SunEx UrbanTree device" }).getAttribute("src")).toBe("/manus-storage/urbantree-single-device_d3285164.png");
    const cityVisionDevice = screen.getByRole("img", { name: "Supplied UrbanTree solar biofilter device in a city setting" });
    expect(cityVisionDevice.getAttribute("src")).toBe("/manus-storage/urbantree-device-solar-biofilter_08fc3e0d.png");
    expect(cityVisionDevice.parentElement?.className).toContain("urban-vision-hero__media--device-portrait");

    expect(uvModule.getAttribute("aria-pressed")).toBe("false");
    fireEvent.click(uvModule);

    expect(uvModule.getAttribute("aria-pressed")).toBe("true");
    const selectedStage = container.querySelector(".purification-stage.is-active");
    expect(selectedStage?.textContent).toContain("UV Chamber");
    expect(screen.queryByText("Now treating")).toBeNull();
  });
});
