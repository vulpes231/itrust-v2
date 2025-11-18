import { APIClient } from "../../helpers/apiHelper";

const api = new APIClient();

async function getCountries() {
  try {
    const response = await api.get("/location/countries");
    return response.data;
  } catch (error) {
    const errMsg = error.response?.data?.message;
    throw new Error(errMsg);
  }
}

async function getStatesByCountry(countryId) {
  try {
    const response = await api.get(`/location/state/${countryId}`);
    return response.data;
  } catch (error) {
    const errMsg = error.response?.data?.message;
    throw new Error(errMsg);
  }
}

async function getCurrencies() {
  try {
    const response = await api.get(`/currency`);
    return response.data;
  } catch (error) {
    const errMsg = error.response?.data?.message;
    throw new Error(errMsg);
  }
}

async function getNations() {
  try {
    const response = await api.get(`location/nationalities`);
    return response.data;
  } catch (error) {
    const errMsg = error.response?.data?.message;
    throw new Error(errMsg);
  }
}

export { getCountries, getStatesByCountry, getCurrencies, getNations };
