import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import ComboSelect from "./ComboSelect";

const options = [
  { isoNumeric: "276", countryName: "Germany" },
  { isoNumeric: "616", countryName: "Poland" },
];

describe("ComboSelect", () => {
  it("keeps document scrolling enabled while options are open", async () => {
    const user = userEvent.setup();

    render(
      <ComboSelect
        optionsData={options}
        setQuery={vi.fn()}
        setSelected={vi.fn()}
        selected={null}
        placeholder="Select country"
      />,
    );

    await user.click(screen.getByRole("combobox"));

    expect(screen.getByRole("listbox")).toBeTruthy();
    expect(document.documentElement.style.overflow).toBe("");
    expect(document.documentElement.style.paddingRight).toBe("");
  });
});
