const express = require("express");
const router = express.Router();
const DashboardController = require("../controllers/DashboardController");

router.get("/recentmovies", DashboardController.listRecentMovies);
// http://localhost:3001/api/recentmovies
router.get("/popularmovies", DashboardController.listPopularMovies);
// http://localhost:3001/api/popularmovies

module.exports = router;