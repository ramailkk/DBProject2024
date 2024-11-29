const {
    listAllreviews,
    listAllreviewsyear,
    listReviewsByRatingRange,
    listreviewsbyyear,
  } = require("../models/reviewModel");
/**
 * Get all employees
 * @param req - Request object
 * @param res - Response object
 */

  async function getAllreviews(req, res) {
    try {
      const userID = req.query.id; // Fetch genre ID from query params
      if (!userID) {
        return res.status(400).json({ message: "User ID is required" });
      }
  
      const movies = await listAllreviews(userID);
      res.json({ data: movies });
    }
    catch (err) {
      res.status(500).json({ message: "Error fetching movies by reviews", error: 
        err});
    }
  }
  
  async function getAllreviewsyear(req, res) {
    try {
      const userID = req.query.id; // Fetch genre ID from query params
      if (!userID) {
        return res.status(400).json({ message: "User ID is required" });
      }
  
      const movies = await listAllreviewsyear(userID);
      res.json({ data: movies });
    } catch (err) {
      res.status(500).json({ message: "Error fetching movies by review year", error: err });
    }
  }

  async function getAllreviewsrating(req, res) {
    try {
      const userID = req.query.id; // Fetch genre ID from query params
      if (!userID) {
        return res.status(400).json({ message: "User ID is required" });
      }
  
      const movies = await listAllreviewsrating(userID);
      res.json({ data: movies });
    } catch (err) {
      res.status(500).json({ message: "Error fetching movies by review year", error: err });
    }
  }

  async function getreviewsbyyear(req, res) {
    try {
        const userID = req.query.id; // Corrected to access userID
        const year = req.query.year; // Correctly fetch year from query params
        if (!year || !userID) {
            return res.status(400).json({ message: "year or userID is missing" });
        }

        const movies = await listreviewsbyyear(userID, year);
        res.json({ data: movies });
    } catch (err) {
        res.status(500).json({ message: "Error fetching movies by review year", error: err });
    }
}
//RATINGS
/**
 * Controller function to handle the fetching of movies by rating range.
 * @param {object} req - The request object containing query parameters.
 * @param {object} res - The response object used to send the results.
 */
// Fixing the controller to extract userID and rating correctly
async function getReviewsByRatingRange(req, res) {
  const { userID, rating } = req.query; // Extract userID and rating from query parameters

  if (!userID || !rating) {  // Ensure both userID and rating are provided
    return res.status(400).json({ message: 'Both userID and rating parameters are required' });
  }

  try {
    // Call the model function to fetch reviews by rating range
    const reviews = await listReviewsByRatingRange(userID, Number(rating));

    res.json({ data: reviews });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error fetching reviews by rating range', error: error.message });
  }
}

module.exports = { getReviewsByRatingRange };




  module.exports = {
    getAllreviews,
    getAllreviewsyear,
    getAllreviewsrating,
    getreviewsbyyear,
    getReviewsByRatingRange
    }
