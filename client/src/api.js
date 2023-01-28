import axios from "axios";

/**
 * Insert search terms.
 * @param {String} text Search term for businesses to be fetched.
 * @return {Promise<businesses>} The businesses fetched from the text.
 */
export const callAutocompleteApi = async (text) => {
  try {
    const { data } = await axios.post("http://localhost:8000/api/autocomplete", { text });
    return data;
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
    const { data } = await axios.post("http://localhost:8000/api/businesses");
    return data;
  } catch (error) {
    console.error(error);
  }
};
