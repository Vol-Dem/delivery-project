import { act, renderHook, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { getCities, getCountries } from "../../../api/geonames";
import type { FormEvent } from "react";
import useCalculator from "./use-calculator";

vi.mock("../../../api/geonames", () => ({
  getCities: vi.fn(),
  getCountries: vi.fn(),
}));

const countries = [
  { countryName: "Germany", countryCode: "DE", isoNumeric: "276" },
  { countryName: "France", countryCode: "FR", isoNumeric: "250" },
];
const cities = [
  { geonameId: 2950159, name: "Berlin" },
  { geonameId: 2944388, name: "Bremen" },
];

beforeEach(() => {
  vi.clearAllMocks();
  vi.mocked(getCountries).mockResolvedValue(countries);
  vi.mocked(getCities).mockResolvedValue(cities);
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("useCalculator", () => {
  it("loads countries and filters each direction independently", async () => {
    const { result } = renderHook(() => useCalculator());

    await waitFor(() => {
      expect(result.current.countriesIsLoading).toBe(false);
      expect(result.current.dispatch.country.options).toEqual(countries);
    });

    act(() => {
      result.current.dispatch.country.setQuery("ger");
      result.current.destination.country.setQuery("fra");
    });

    expect(result.current.dispatch.country.options).toEqual([countries[0]]);
    expect(result.current.destination.country.options).toEqual([countries[1]]);
  });

  it("loads cities and resets the previous city when a country changes", async () => {
    const { result } = renderHook(() => useCalculator());
    const country = countries[0];

    act(() => {
      result.current.dispatch.city.setQuery("old");
      result.current.dispatch.city.select({ geonameId: 1, name: "Old city" });
      result.current.dispatch.country.select(country);
    });

    expect(result.current.dispatch.city.query).toBe("");
    expect(result.current.dispatch.city.selected).toBeNull();
    await waitFor(() => {
      expect(getCities).toHaveBeenCalledWith("DE");
      expect(result.current.dispatch.city.options).toEqual(cities);
      expect(result.current.dispatch.city.isLoading).toBe(false);
    });
  });

  it("clears dependent city state when a country is cleared", async () => {
    const { result } = renderHook(() => useCalculator());

    act(() => result.current.dispatch.country.select(countries[0]));
    await waitFor(() => {
      expect(result.current.dispatch.city.options).toEqual(cities);
    });

    act(() => result.current.dispatch.country.select(null));

    expect(result.current.dispatch.country.selected).toBeNull();
    expect(result.current.dispatch.city.selected).toBeNull();
    expect(result.current.dispatch.city.options).toEqual([]);
  });

  it("contains city request failures and clears the loading state", async () => {
    const requestError = new Error("Network unavailable");
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
    vi.mocked(getCities).mockRejectedValueOnce(requestError);
    const { result } = renderHook(() => useCalculator());

    act(() => result.current.dispatch.country.select(countries[0]));

    await waitFor(() => {
      expect(result.current.dispatch.city.isLoading).toBe(false);
      expect(consoleError).toHaveBeenCalledWith(
        "Failed to load cities for DE",
        requestError,
      );
    });
  });

  it("coordinates the quote modal and email validation flow", () => {
    const { result } = renderHook(() => useCalculator());
    const preventDefault = vi.fn();

    act(() =>
      result.current.quote.open({ preventDefault } as unknown as FormEvent<HTMLFormElement>),
    );
    expect(preventDefault).toHaveBeenCalledOnce();
    expect(result.current.quote.isOpen).toBe(true);

    act(() => result.current.quote.showEmailError("invalid"));
    expect(result.current.quote.emailError).toBe("Email must includes @");

    act(() =>
      result.current.quote.submit({
        preventDefault,
        currentTarget: {
          elements: {
            item: () => ({ value: "person@example.com" }),
          },
        },
      } as unknown as FormEvent<HTMLFormElement>),
    );
    expect(result.current.quote.isSent).toBe(true);

    act(() => result.current.quote.close());
    expect(result.current.quote.isOpen).toBe(false);
    expect(result.current.quote.isSent).toBe(false);
  });
});
