/**
 * Controller for movie-related operations
 */
const {
    listAllmovies,
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
module.exports = {
    getAllmovies,
  };
  