const {
    getRecentMovies,
    getPopularMovies
  } = require("../models/DashboardModel");

  async function listRecentMovies(req, res) {
    try {
      // get all employees
    const  movies = await getRecentMovies();
      // send response with movies in json
    res.json({ data: movies });
    } catch (err) {
    res.status(500).json({ message: "Error fetching movies", error: err });
    }
  }

  async function listPopularMovies(req, res) {
    try {
      // get all employees
    const  movies = await getPopularMovies();
      // send response with movies in json
    res.json({ data: movies });
    } catch (err) {
    res.status(500).json({ message: "Error fetching movies", error: err });
    }
  }

  module.exports={
    listRecentMovies,
    listPopularMovies
  }