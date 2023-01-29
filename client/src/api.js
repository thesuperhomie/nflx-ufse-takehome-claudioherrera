import axios from "axios";

/**
 * Insert search terms.
 * @param {String} text Search term for businesses to be fetched.
 * @return {Promise<businesses>} The businesses fetched from the text.
 */
export const callAutocompleteApi = async (text) => {
  try {
    return axios.post("http://localhost:8000/api/autocomplete", { text });
  } catch (error) {
    console.error(error);
  }
};

/**
 * Initialize app with data.
 * @return {Promise<businesses>}
 */
export const initializeAppData = async () => {
  try {
    return await axios.post("http://localhost:8000/api/businesses");
  } catch (error) {
    console.error(error);
  }
};
