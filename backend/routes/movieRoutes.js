const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movieController");

//http://localhost:3001/api/movies
router.get("/movies", movieController.getAllmovies);
router.get("/genres", movieController.getAllgenres);
router.get("/moviegenre",movieController.fetchMoviesByGenre);


module.exports = router;