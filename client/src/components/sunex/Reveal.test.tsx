import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Reveal } from "./Reveal";

const motionPreferences = vi.hoisted(() => ({ reduced: false }));

vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, initial, whileInView, transition, viewport, ...props }: Record<string, unknown>) => (
      <div
        {...props}
        data-initial={JSON.stringify(initial)}
        data-transition={JSON.stringify(transition)}
        data-viewport={JSON.stringify(viewport)}
        data-while-in-view={JSON.stringify(whileInView)}
      >
        {children as React.ReactNode}
      </div>
    ),
    span: ({ initial, whileInView, transition, viewport, ...props }: Record<string, unknown>) => (
      <span
        {...props}
        data-initial={JSON.stringify(initial)}
        data-transition={JSON.stringify(transition)}
        data-viewport={JSON.stringify(viewport)}
        data-while-in-view={JSON.stringify(whileInView)}
      />
    ),
  },
  useReducedMotion: () => motionPreferences.reduced,
}));

describe("Reveal", () => {
  it("keeps content visible while a SunEx solar-light pass preserves wrapped-card hover transforms", () => {
    motionPreferences.reduced = false;
    render(<Reveal className="example-card" delay={0.1}>Calm reveal</Reveal>);

    const wrapper = screen.getByText("Calm reveal");
    expect(wrapper.className).toBe("reveal example-card");
    expect(wrapper.dataset.initial).toBe("false");
    expect(wrapper.dataset.whileInView).toBe(JSON.stringify({ opacity: 1 }));
    expect(wrapper.dataset.transition).toContain('"duration":0.58');
    expect(wrapper.dataset.viewport).toContain('"amount":0.16');
    const solarSweep = document.querySelector(".reveal__solar-sweep") as HTMLElement;
    expect(solarSweep.dataset.whileInView).toContain('"x":"120%"');
    expect(solarSweep.dataset.whileInView).toContain('"opacity":[0,0.42,0]');
    const solarDisc = document.querySelector(".reveal__solar-disc") as HTMLElement;
    expect(solarDisc.dataset.whileInView).toContain('"scale":[0.92,1,1.03]');
  });

  it("bypasses non-essential fade motion when reduced motion is requested", () => {
    motionPreferences.reduced = true;
    render(<Reveal>Accessible reveal</Reveal>);

    const wrapper = screen.getByText("Accessible reveal");
    expect(wrapper.dataset.initial).toBe("false");
    expect(wrapper.dataset.whileInView).toBeUndefined();
    expect(wrapper.querySelector(".reveal__solar-disc")).toBeNull();
    motionPreferences.reduced = false;
  });
});
