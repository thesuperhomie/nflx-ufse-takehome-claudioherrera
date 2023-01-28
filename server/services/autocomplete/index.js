import axios from "axios";
import { ENV, AXIOS_CONFIG } from "../../config";

/**
 * Service used to get business data from the Yelp API and
 * delegate data updates via the database and business service
 * through composition.
 * @return {AutocompleteService} The business service
 */
export default class AutocompleteService {
  constructor(db, businessService, cache) {
    this.db = db;
    this.businessService = businessService;
    this.cache = cache;
    this.fetchCategoriesForText = this.fetchCategoriesForTextAndFindBusinesses.bind(this);
  }

  /**
   * Fetch businesses for the given search text.
   * @param {text} text
   * @return {Promise<businesses>} The businesses found from the text.
   */
  async fetchCategoriesForTextAndFindBusinesses(text) {
    if (this.cache.get(text) != null) {
      console.debug(`Cache hit for searh: ${text}`);
      return this.cache.get(text);
    }
    const url = `${ENV.YELP_BASE_URL}/autocomplete?text=${text}&${ENV.DEFAULT_LAT_LNG}`;
    console.debug(`Making request to: ${url}...`);
    try {
      const {
        data: { categories },
      } = await axios.get(url, AXIOS_CONFIG);
      await this.db.insertCategories(categories);
      const mappedCategories = categories.map((category) => category.alias);
      const businesses = await this.businessService.fetchAndUpdateBusinessesForCategories(mappedCategories);
      this.cache.set(text, businesses);
      return businesses;
    } catch (error) {
      console.error(error);
      return {};
    }
  }
}
