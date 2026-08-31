import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { getCities, getCountries } from "./geonames";

const geonames = [{ countryName: "Germany", countryCode: "DE" }];

beforeEach(() => {
  vi.stubEnv("VITE_GEONAMES_USERNAME", "test-user");
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue({
      json: async () => ({ geonames }),
    }),
  );
});

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("GeoNames API", () => {
  it("fetches and unwraps countries", async () => {
    await expect(getCountries()).resolves.toEqual(geonames);
    expect(fetch).toHaveBeenCalledWith(
      "https://secure.geonames.org/countryInfoJSON?username=test-user",
    );
  });

  it("fetches and unwraps cities for a country", async () => {
    await expect(getCities("DE")).resolves.toEqual(geonames);
    expect(fetch).toHaveBeenCalledWith(
      "https://secure.geonames.org/searchJSON?country=DE&featureClass=P&maxRows=1000&username=test-user",
    );
  });

  it("leaves request failures for the caller to handle", async () => {
    fetch.mockRejectedValueOnce(new Error("Network unavailable"));

    await expect(getCountries()).rejects.toThrow("Network unavailable");
  });
});
