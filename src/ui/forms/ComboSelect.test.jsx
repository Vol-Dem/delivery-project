import { fireEvent, render, screen, waitFor } from "@testing-library/react";
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

  it.each([
    ["country", options, options[0]],
    [
      "city",
      [
        { geonameId: 2950159, name: "Berlin" },
        { geonameId: 2944388, name: "Bremen" },
      ],
      { geonameId: 2950159, name: "Berlin" },
    ],
  ])("shows the checkmark for a selected %s", async (_, optionList, selected) => {
    const user = userEvent.setup();

    render(
      <ComboSelect
        optionsData={optionList}
        setQuery={vi.fn()}
        setSelected={vi.fn()}
        selected={selected}
        placeholder="Select option"
      />,
    );

    await user.click(screen.getByRole("combobox"));

    const selectedOption = screen.getByRole("option", {
      name: selected.name || selected.countryName,
    });
    expect(selectedOption.querySelector("svg")).toBeTruthy();
  });

  it("matches cities by GeoNames ID instead of duplicate names", async () => {
    const user = userEvent.setup();
    const duplicateCities = [
      { geonameId: 1, name: "Springfield" },
      { geonameId: 2, name: "Springfield" },
    ];

    render(
      <ComboSelect
        optionsData={duplicateCities}
        setQuery={vi.fn()}
        setSelected={vi.fn()}
        selected={duplicateCities[1]}
        placeholder="Select city"
      />,
    );

    await user.click(screen.getByRole("combobox"));

    const cityOptions = screen.getAllByRole("option", { name: "Springfield" });
    expect(cityOptions[0].querySelector("svg")).toBeNull();
    expect(cityOptions[0].getAttribute("aria-selected")).toBe("false");
    expect(cityOptions[1].querySelector("svg")).toBeTruthy();
    expect(cityOptions[1].getAttribute("aria-selected")).toBe("true");
  });

  it("renders options in batches of 40 as the list is scrolled", async () => {
    const user = userEvent.setup();
    const manyOptions = Array.from({ length: 85 }, (_, index) => ({
      geonameId: index + 1,
      name: `City ${index + 1}`,
    }));

    render(
      <ComboSelect
        optionsData={manyOptions}
        setQuery={vi.fn()}
        setSelected={vi.fn()}
        selected={null}
        placeholder="Select city"
      />,
    );

    await user.click(screen.getByRole("combobox"));
    const listbox = screen.getByRole("listbox");

    expect(screen.getAllByRole("option")).toHaveLength(40);
    Object.defineProperties(listbox, {
      clientHeight: { configurable: true, value: 200 },
      scrollHeight: { configurable: true, value: 600 },
      scrollTop: { configurable: true, value: 400 },
    });

    fireEvent.scroll(listbox);
    await waitFor(() => expect(screen.getAllByRole("option")).toHaveLength(80));

    fireEvent.scroll(listbox);
    await waitFor(() => expect(screen.getAllByRole("option")).toHaveLength(85));
  });
});
