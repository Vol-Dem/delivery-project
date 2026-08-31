import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { DestinationFields, DispatchFields } from "./CalculatorFields";

const createProps = () => ({
  countriesIsLoading: false,
  countryQuery: "",
  countryOptions: [],
  setCountryQuery: vi.fn(),
  selectedCountry: null,
  selectCountry: vi.fn(),
  popularCountries: [],
  selectPopularCountry: vi.fn(),
  citiesIsLoading: false,
  cityQuery: "",
  cityOptions: [],
  setCityQuery: vi.fn(),
  selectedCity: null,
  selectCity: vi.fn(),
});

describe.each([
  ["dispatch", DispatchFields],
  ["destination", DestinationFields],
])("%s calculator fields", (_, Fields) => {
  it("keeps the city field disabled when the country is cleared", () => {
    render(<Fields {...createProps()} />);

    const [, cityInput] = screen.getAllByRole("combobox");
    expect(cityInput.disabled).toBe(true);
  });
});
