import axios from "axios";

export const callAutocompleteApi = async (text) => {
  try {
    const { data } = await axios.post("http://localhost:8000/api/autocomplete", { text });
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const initializeAppData = async () => {
  try {
    const { data } = await axios.post("http://localhost:8000/api/businesses");
    return data;
  } catch (error) {
    console.error(error);
  }
};
