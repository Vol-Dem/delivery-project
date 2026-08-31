import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import ErrorBoundary from "./ErrorBoundary";

let shouldThrow;

const UnstableContent = () => {
  if (shouldThrow) {
    throw new Error("Sensitive provider details");
  }

  return <p>Recovered content</p>;
};

describe("ErrorBoundary", () => {
  beforeEach(() => {
    shouldThrow = true;
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("shows a safe fallback and can retry rendering", async () => {
    const user = userEvent.setup();
    const onError = vi.fn();
    render(
      <ErrorBoundary onError={onError}>
        <UnstableContent />
      </ErrorBoundary>,
    );

    expect(screen.getByRole("alert").textContent).not.toContain(
      "Sensitive provider details",
    );
    expect(onError).toHaveBeenCalledOnce();

    shouldThrow = false;
    await user.click(screen.getByRole("button", { name: "Try again" }));
    expect(screen.getByText("Recovered content")).toBeTruthy();
  });
});
