const countryInfoUrl = "https://secure.geonames.org/countryInfoJSON";
const searchUrl = "https://secure.geonames.org/searchJSON";

const requestGeonames = async (url, parameters = {}) => {
  const searchParameters = new URLSearchParams({
    ...parameters,
    username: import.meta.env.VITE_GEONAMES_USERNAME,
  });
  const response = await fetch(`${url}?${searchParameters}`);
  const data = await response.json();

  return data.geonames;
};

export const getCountries = () => requestGeonames(countryInfoUrl);

export const getCities = (countryCode) =>
  requestGeonames(searchUrl, {
    country: countryCode,
    featureClass: "P",
    maxRows: 1000,
  });
