import { onRequest } from "firebase-functions/v2/https";

// APIs not related to the current project

const geoUserName = process.env.GEONAMES_USER_NAME;

export const getGeonamesCountries = onRequest(
  {
    timeoutSeconds: 20,
    cors: true,
  },
  async (request, response) => {
    try {
      const responseGeo = await fetch(
        `http://api.geonames.org/countryInfoJSON?username=${geoUserName}`,
      );

      const responseData = await responseGeo.json();

      response.send(responseData);
    } catch (err) {
      return {
        error: err.message,
      };
    }
  },
);
export const getGeonamesCities = onRequest(
  {
    timeoutSeconds: 20,
    cors: true,
  },
  async (request, response) => {
    try {
      const countryCode = request.query?.country || request.params[0];
      const maxRows = request.query?.maxRows || request.params[1];

      const responseGeo = await fetch(
        `http://api.geonames.org/searchJSON?country=${countryCode}&featureClass=P&maxRows=${maxRows}&username=${geoUserName}`,
      );

      const responseData = await responseGeo.json();

      response.send(responseData);
    } catch (err) {
      return {
        error: err.message,
      };
    }
  },
);
