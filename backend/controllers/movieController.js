/**
 * Controller for movie-related operations
 */
const {
  listAllmovies,
  listAllgenres,
  getMoviesByGenre,
  getUserReviewInfo,
  getUserListInfo,
  listMoviesByDecade,
  getMoviesByName,
  listMoviesByRatingRange,
  setSelectedMember
} = require("../models/movieModel");

// const db = require("../config/db");

/**
 * Get all employees
 * @param req - Request object
 * @param res - Response object
 */
async function fetchUserReviewInfo(req, res) {
  try {
    const userID= req.query.id;
    // get all employees
  const  user = await getUserReviewInfo(userID);
    // send response with movies in json
  res.json({data : user});
  } catch (err) {
  res.status(500).json({ message: "Error fetching users", error: err });
  }
}

async function fetchUserListInfo(req, res) {
  try {
    const userID= req.query.id;
    const listID = req.query.listID;
    // get all employees
  const  user = await getUserListInfo(userID,listID);
    // send response with movies in json
  res.json({data : user});
  } catch (err) {
  res.status(500).json({ message: "Error fetching users", error: err });
  }
}

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
/**
 * Get movies by decade
 * @param req - Request object
 * @param res - Response object
 */
async function getMoviesByDecade(req, res) {
  try {
    const { decade } = req.query; // Get the decade from query parameters
    if (!decade || isNaN(decade)) {
      return res.status(400).json({ message: "Invalid or missing 'decade' parameter" });
    }

    const movies = await listMoviesByDecade(decade);
    res.json({ data: movies });
  } catch (err) {
    res.status(500).json({ message: "Error fetching movies by decade", error: err });
  }
}







/**
 * Controller function to get movies by fuzzy name search
 * @param req - Request object
 * @param res - Response object
 */
async function getMoviesByNameHandler(req, res) {
  try {
    // Get the 'name' query parameter from the request
    const { name } = req.query;
    
    if (!name) {
      return res.status(400).json({ message: 'Movie name query parameter is required' });
    }

    // Call the function to get movies by name
    const movies = await getMoviesByName(name);

    res.json({ data: movies });
  } catch (error) {
    console.error('Error in getMoviesByNameHandler:', error);
    res.status(500).json({ message: 'Error fetching movies', error: error.message || error });
  }
}


//RATINGS
/**
 * Controller function to handle the fetching of movies by rating range.
 * @param {object} req - The request object containing query parameters.
 * @param {object} res - The response object used to send the results.
 */
async function getMoviesByRatingRange(req, res) {
  const { rating } = req.query;

  if (!rating) {
    return res.status(400).json({ message: 'Rating parameter is required' });
  }

  try {
    // Call the model function to fetch movies by rating range
    const movies = await listMoviesByRatingRange(Number(rating));

    res.json({ data: movies });
    // return res.status(200).json({ data: movies });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error fetching movies by rating range', error: error.message });
  }
}

async function updateSelectedMember(req, res) {
  try {
    const { selectedMember } = req.body; // Extract selectedMember from request body
    setSelectedMember(selectedMember);
    
    // Now, you can use the selectedMember value in your model or any business logic.
    console.log('Selected Member:', selectedMember);

    res.status(200).json({ message: 'Selected member updated successfully' });
  } catch (error) {
    console.error('Error updating selected member:', error);
    res.status(500).json({ message: 'Failed to update selected member', error: error.message });
  }
}


module.exports = {
  fetchMoviesByGenre,
  getAllmovies,
  getAllgenres,
  getMoviesByDecade,
  getMoviesByNameHandler,
  getMoviesByRatingRange,
  updateSelectedMember,
  fetchUserReviewInfo,
  fetchUserListInfo
  };