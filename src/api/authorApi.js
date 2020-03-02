import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.API_URL + "/authors/";

// fetch is build in modren browsers so that we can use this directly with out using any extra tools.
// fetch is a promise based API with promises, the then function is called after the fucntion call is complete
export function getAuthors() {
  return fetch(baseUrl)
    .then(handleResponse)
    .catch(handleError);
}
