import axios from "axios";
import { ENV, AXIOS_CONFIG } from "../../config";

export const BUSINESS_KEYS = { name: true, image_url: true, url: true, rating: true, price: true, display_phone: true };

/**
 * Service used to get business data from the Yelp API and
 * delegate data updates via the database service through composition.
 * @return {BusinessesService} The business service
 */
export default class BusinessesService {
  constructor(db) {
    this.db = db;
    this.fetchAndUpdateBusinessesForCategories = this.fetchAndUpdateBusinessesForCategories.bind(this);
    this.mapToResultSet = this.mapToResultSet.bind(this);
  }

  /**
   * Insert search terms.
   * @param {Array<String>} categories Categories to query businesses on.
   * @return {Promise<businesses>} The businesses fetched from the categories.
   */
  async fetchAndUpdateBusinessesForCategories(categories) {
    const url = `${ENV.YELP_BASE_URL}/businesses/search?cateogries=${categories.join(",")}&${ENV.DEFAULT_LAT_LNG}`;
    console.debug(`Making request to: ${url}...`);
    try {
      const {
        data: { businesses },
      } = await axios.get(url, AXIOS_CONFIG);
      await this.db.insertBusinesses(businesses);
      return this.mapToResultSet(businesses);
    } catch (error) {
      console.error(error);
      return {};
    }
  }

  /**
   * Filter out data to minimize size down the wire. Only return values we need
   * that drive the UI.
   * @param {businesses}
   * @return {formattedBusinesses}
   */
  mapToResultSet(businesses) {
    return businesses.map(({ name, image_url, url, rating, price, display_phone }) => ({
      name,
      image_url,
      url,
      rating,
      price,
      display_phone,
    }));
  }
}
