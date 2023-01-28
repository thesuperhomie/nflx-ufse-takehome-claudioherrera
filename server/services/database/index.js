import CREATE_TABLE_STATEMENTS from "./tables";
import sqlite3 from "sqlite3";

/**
 * Insert search terms.
 * @param {searchTerms} searchTerms Search term data to add.
 * @return {Promise<businesses>} The businesses inserted.
 */
export default class Database {
  constructor() {
    this.db = new sqlite3.Database(":memory:", (error) => {
      if (error) {
        console.error(error);
        process.exit();
      }
    });
    this.createTables = this.createTables.bind(this);
    this.getBusinessesForCriteria = this.getBusinessesForCriteria.bind(this);
    this.insertBusinesses = this.insertBusinesses.bind(this);
    this.insertCategories = this.insertCategories.bind(this);
    this.insertSearchTerms = this.insertSearchTerms.bind(this);
  }

  /**
   * Creates initial tables.
   */
  createTables() {
    return new Promise((resolve, reject) => {
      this.db.exec(CREATE_TABLE_STATEMENTS.join("\n"), (error) => {
        if (error != null) {
          return reject(error);
        }
        resolve();
      });
    });
  }

  /**
   * Filters businesses from provided criteria.
   * @param {criteria} criteria Criteria to filter businesses on. Object like:
   *                            { 'price': '$$', rating: 2.0 }
   * @return {Promise<businesses>} The businesses found from the criteria.
   */
  getBusinessesForCriteria(criteria) {
    const filteredCriteria = Object.fromEntries(Object.entries(criteria).filter(([_, v]) => v != null));
    const columns = Object.keys(filteredCriteria);
    const whereSuffix = "";
    for (let i = 0; i < columns.length; i++) {
      whereSuffix += ` ${columns[i]} = ? ${i + 1 === columns.length - 1 ? "" : "AND"}`;
    }
    const values = Object.values(filteredCriteria);
    const sql = `SELECT * FROM businesses WHERE${whereSuffix};`;
    return new Promise((resolve, reject) => {
      this.db.all(sql, values, (error, rows) => {
        if (error) {
          return reject(error);
        }
        resolve(rows);
      });
    });
  }

  /**
   * Insert business records.
   * @param {businesses} businesses Business data to add.
   * @return {Promise<businesses>} The businesses inserted.
   */
  insertBusinesses(businesses) {
    return new Promise((resolve, reject) => {
      try {
        console.debug("Beginning transaction...");
        this.db.run("BEGIN TRANSACTION;");
        businesses.forEach((business) => {
          this.db.run(
            "INSERT OR IGNORE INTO businesses (name, image_url, url, rating, price, display_phone) VALUES (?, ?, ?, ?, ?, ?)",
            [
              business["name"],
              business["image_url"],
              business["url"],
              business["rating"],
              business["price"],
              business["display_phone"],
            ],
            function (error) {
              if (error != null) {
                return reject(error);
              }
            }
          );
        });
        this.db.run("END;");
        console.debug("Transaction success...");
        resolve(businesses);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Insert category records records.
   * @param {categories} categories Category data to add.
   * @return {Promise<categories>} The categories inserted.
   */
  insertCategories(categories) {
    return new Promise((resolve, reject) => {
      try {
        this.db.run("BEGIN TRANSACTION;");
        console.debug("Beginning transaction...");
        categories.forEach((category) => {
          this.db.run(
            "INSERT OR IGNORE INTO categories (alias, title) VALUES (?, ?)",
            [category["alias"], category["title"]],
            function (error) {
              if (error != null) {
                return reject(error);
              }
            }
          );
        });
        this.db.run("END;");
        console.debug("Transaction success...");
        resolve(categories);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Insert search terms.
   * @param {searchTerms} searchTerms Search term data to add.
   * @return {Promise<businesses>} The businesses inserted.
   */
  insertSearchTerms(searchTerms) {
    return new Promise((resolve, reject) => {
      try {
        this.db.run("BEGIN TRANSACTION;");
        console.debug("Beginning transaction...");
        searchTerms.forEach((searchTerm) => {
          this.db.run("INSERT OR IGNORE INTO search_terms (term) VALUES (?)", [searchTerm["term"]], function (error) {
            if (error != null) {
              return reject(error);
            }
          });
        });
        this.db.run("END;");
        console.debug("Transaction success...");
        resolve(searchTerms);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Handle errors.
   * @return {void>}
   */
  handleError(error) {
    this.db.close();
    console.error(error);
    process.exit();
  }
}
