import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import Select from "./Select";

const options = [
  {
    title: "Envelope",
    size: "Up to 2 kg",
    description: "Documents",
  },
  {
    title: "Box S",
    size: "Up to 5 kg",
    description: "Small parcels",
  },
];

describe("Select", () => {
  it("selects an option and preserves the title callback contract", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Select options={options} onChange={onChange} />);

    await user.click(screen.getByRole("button", { name: "Select size" }));
    await user.click(screen.getByRole("option", { name: /Box S/i }));

    expect(onChange).toHaveBeenCalledWith("Box S");
    expect(screen.getByRole("button", { name: "Box S" })).toBeTruthy();
    await waitFor(() => {
      expect(screen.queryByRole("listbox")).toBeNull();
    });
  });

  it("supports keyboard selection", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Select options={options} onChange={onChange} />);

    const button = screen.getByRole("button", { name: "Select size" });
    button.focus();
    await user.keyboard("{ArrowDown}{Enter}");

    expect(onChange).toHaveBeenCalledWith("Envelope");
    expect(screen.getByRole("button", { name: "Envelope" })).toBeTruthy();
  });

  it("keeps document scrolling enabled while options are open", async () => {
    const user = userEvent.setup();
    render(<Select options={options} />);

    await user.click(screen.getByRole("button", { name: "Select size" }));

    expect(screen.getByRole("listbox")).toBeTruthy();
    expect(document.documentElement.style.overflow).toBe("");
    expect(document.documentElement.style.paddingRight).toBe("");
  });
});
