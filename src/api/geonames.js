const countryInfoUrl = "https://secure.geonames.org/countryInfoJSON";
const searchUrl = "https://secure.geonames.org/searchJSON";

const requestGeonames = async (url, parameters = {}) => {
  const searchParameters = new URLSearchParams({
    ...parameters,
    username: import.meta.env.VITE_GEONAMES_USERNAME,
  });
  const response = await fetch(`${url}?${searchParameters}`);

  if (!response.ok) {
    throw new Error(`GeoNames request failed with status ${response.status}`);
  }

  const data = await response.json();

  if (!Array.isArray(data.geonames)) {
    throw new Error("GeoNames returned an invalid response");
  }

  return data.geonames;
};

export const getCountries = () => requestGeonames(countryInfoUrl);

export const getCities = (countryCode) =>
  requestGeonames(searchUrl, {
    country: countryCode,
    featureClass: "P",
    maxRows: 1000,
  });
