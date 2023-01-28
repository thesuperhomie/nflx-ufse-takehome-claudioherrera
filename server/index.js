import bodyParser from "body-parser";
import express from "express";
import LRU from "lru-cache";
import AutocompleteService from "./services/autocomplete";
import BusinessesService from "./services/businesses";
import Database from "./services/database";

const app = express();
const initialCategories = ["deli"];
const PORT = 8000;
const LRU_CACHE_CONFIG = {
  max: 500,
  ttl: 1000 * 60 * 5,
  allowStale: false,
  updateAgeOnGet: false,
  updateAgeOnHas: false,
};

// In memory cache
const inMemoryCache = new LRU(LRU_CACHE_CONFIG);

app.use(bodyParser.json());

(async function () {
  console.log("Creating tables...");
  // create services to serve requestss
  const db = new Database();
  const businessService = new BusinessesService(db);
  const autocompleteService = new AutocompleteService(db, businessService, inMemoryCache);
  try {
    // Create tables to initialize in memory DB.
    await db.createTables();
    console.debug("Tables created...");
  } catch (error) {
    console.error(error);
  }

  app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}...`);

    // Temporary fix for CORS proxy issue. Development only...
    app.use(function (req, res, next) {
      res.header("Access-Control-Allow-Origin", "http://localhost:3000");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });

    // Given a search term, get the relevant categories and then
    // fetch the relevant businesses. The main endpoint.
    app.post("/api/autocomplete", async (req, res) => {
      // Need to add validation
      const text = req.body.text || "del";
      const businesses = await autocompleteService.fetchCategoriesForTextAndFindBusinesses(text);
      res.send(businesses);
    });

    // Used to populate intial data...
    app.post("/api/businesses", async (req, res) => {
      const businesses = await businessService.fetchAndUpdateBusinessesForCategories(initialCategories);
      res.send(businesses);
    });

    // Would add other handlers if I had more time...
  });

  // Catch unhandled rejections
  process.on("unhandledRejection", (err) => {
    console.error("Unhandled rejection", err);
  });

  // Catch uncaught exceptions
  process.on("uncaughtException", (err) => {
    console.error("Uncaught exception", err);
  });
})();
