/**
 * Environment data used within the server. Normally sensitive data would not be
 * stored statically, but given the time constraint it is placed here.
 */
const API_KEY =
  "PI8fgdcDC4iBzZh2-bt0diDCrBO35KvTQLxzoJmF_Srb19BJ2hAvmXlWlHGVovL-2K0Eyl4AsTYK9PljYsAttepRk9DlpoE7jyhJCFlxj_9U3Tijy-AOuW8tb_PTY3Yx";

export const ENV = {
  API_KEY,
  DEFAULT_LAT_LNG: "latitude=37.786882&longitude=-122.399972",
  YELP_BASE_URL: "https://api.yelp.com/v3",
};

export const AXIOS_CONFIG = {
  headers: {
    Authorization: `Bearer ${API_KEY}`,
    Accept: "application/json",
  },
};
