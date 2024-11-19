/**
 * Controller for movie-related operations
 */
const {
    getGenreByMovie,
    getActorByMovie,
    getDirectorsByMovie
} = require("../models/filmpageModel");

  // const db = require("../config/db");

/**
   * Get all employees
   * @param req - Request object
   * @param res - Response object
   */
async function fetchGenresByMovie(req, res) {
    try {
      const movieID = req.query.id; // Fetch genre ID from query params
      if (!movieID) {
        return res.status(400).json({ message: "Movie ID is required" });
      }
  
      const genres = await getGenreByMovie(movieID);
      res.json({ data: genres });
    } catch (err) {
      res.status(500).json({ message: "Error fetching genres", error: err });
    }
  }
  async function fetchActorsByMovie(req, res) {
    try {
      const movieID = req.query.id; // Fetch genre ID from query params
      if (!movieID) {
        return res.status(400).json({ message: "Movie ID is required" });
      }
  
      const actors = await getActorByMovie(movieID);
      res.json({ data: actors });
    } catch (err) {
      res.status(500).json({ message: "Error fetching actors", error: err });
    }
  }

  async function fetchDirectorsByMovie(req, res) {
    try {
      const movieID = req.query.id; // Fetch movie ID from query params
      if (!movieID) {
        return res.status(400).json({ message: "Movie ID is required" });
      }
  
      const directors = await getDirectorsByMovie(movieID);
      res.json({ data: directors });
    } catch (err) {
      res.status(500).json({ message: "Error fetching directors", error: err });
    }
}


module.exports = {
    fetchGenresByMovie,
    fetchActorsByMovie,
    fetchDirectorsByMovie
 };