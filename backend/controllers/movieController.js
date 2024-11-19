/**
 * Controller for movie-related operations
 */
const {
  listAllmovies,
  listAllgenres,
  getMoviesByGenre,
} = require("../models/movieModel");

const db = require("../config/db");

/**
 * Get all employees
 * @param req - Request object
 * @param res - Response object
 */
async function getAllmovies(req, res) {
  try {
    // get all employees
  const  movies = await listAllmovies();
    // send response with movies in json
  res.json({ data: movies });
  } catch (err) {
  res.status(500).json({ message: "Error fetching movies", error: err });
  }
}
async function getAllgenres(req, res) {
  try {
    // get all employees
  const  movies = await listAllgenres();
    // send response with movies in json
  res.json({ data: movies });
  } catch (err) {
  res.status(500).json({ message: "Error fetching movies", error: err });
  }
}
/**
 * Fetch movies by genre ID
 * @param req - Request object
 * @param res - Response object
 */
async function fetchMoviesByGenre(req, res) {
  try {
    const genreID = req.query.id; // Fetch genre ID from query params
    if (!genreID) {
      return res.status(400).json({ message: "Genre ID is required" });
    }

    const movies = await getMoviesByGenre(genreID);
    res.json({ data: movies });
  } catch (err) {
    res.status(500).json({ message: "Error fetching movies by genre", error: err });
  }
}

module.exports = {
  fetchMoviesByGenre,
  getAllmovies,
  getAllgenres,
  };