import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "./App";

describe("App", () => {
  it("renders the primary delivery experience", () => {
    render(<App />);

    expect(
      screen.getByRole("heading", { name: /express delivery/i }),
    ).toBeTruthy();
  });

  it("uses sequential heading levels", () => {
    render(<App />);

    const headingLevels = screen
      .getAllByRole("heading")
      .map((heading) => Number.parseInt(heading.tagName.slice(1), 10));

    expect(headingLevels[0]).toBe(1);

    headingLevels.slice(1).forEach((level, index) => {
      expect(level).toBeLessThanOrEqual(headingLevels[index] + 1);
    });
  });
});
