const countryInfoUrl = "https://secure.geonames.org/countryInfoJSON";
const searchUrl = "https://secure.geonames.org/searchJSON";

export interface Country {
  countryCode: string;
  countryName: string;
  isoNumeric: string;
}

export interface City {
  geonameId: number;
  name: string;
}

export type LocationOption = Country | City;

interface GeonamesResponse {
  geonames: unknown[];
}

const isGeonamesResponse = (value: unknown): value is GeonamesResponse =>
  typeof value === "object" &&
  value !== null &&
  "geonames" in value &&
  Array.isArray(value.geonames);

const requestGeonames = async <T>(
  url: string,
  parameters: Record<string, string | number> = {},
): Promise<T[]> => {
  const searchParameters = new URLSearchParams({
    ...parameters,
    username: import.meta.env.VITE_GEONAMES_USERNAME,
  });
  const response = await fetch(`${url}?${searchParameters}`);

  if (!response.ok) {
    throw new Error(`GeoNames request failed with status ${response.status}`);
  }

  const data: unknown = await response.json();

  if (!isGeonamesResponse(data)) {
    throw new Error("GeoNames returned an invalid response");
  }

  return data.geonames as T[];
};

export const getCountries = () => requestGeonames<Country>(countryInfoUrl);

export const getCities = (countryCode: string) =>
  requestGeonames<City>(searchUrl, {
    country: countryCode,
    featureClass: "P",
    maxRows: 1000,
  });
