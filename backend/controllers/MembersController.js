/**
 * Controller for movie-related operations
 */
const {
  List_Row_Members,
  List_Single_Member,
  listfavmovies,
  listbyrev
} = require("../models/MembersModel");

  // const db = require("../config/db");

/**
   * Get all employees
   * @param req - Request object
   * @param res - Response object
   */
async function fetchRowMember(req, res) {
  try {
    // get all employees
  const  members = await List_Row_Members();
    // send response with movies in json
  res.json({ data: members });
  } catch (err) {
  res.status(500).json({ message: "Error fetching members", error: err });
  }
}
async function fetchSingleMember(req, res) {
  const userID = req.query.id; 
  try {
    // get all employees
  const  member = await List_Single_Member(userID);
    // send response with movies in json
  res.json(member);
  } catch (err) {
  res.status(500).json({ message: "Error fetching members", error: err });
  }
}

async function fetchfavmovies(req, res) {
  try {
    // get all employees
    const userID = req.query.id; // Fetch genre ID from query params
    if (!userid) {
      return res.status(400).json({ message: "user ID is required" });
    }
  const  members = await listfavmovies(userID);
    // send response with movies in json
  res.json({ data: members });
  } catch (err) {
  res.status(500).json({ message: "Error fetching members", error: err });
  }
}

async function fetchbyrev(req, res) {
  try {
    // get all employees
    const userid = req.query.id; // Fetch genre ID from query params
    if (!userid) {
      return res.status(400).json({ message: "user ID is required" });
    }
  const  members = await listbyrev(userid);
    // send response with movies in json
  res.json({ data: members });
  } catch (err) {
  res.status(500).json({ message: "Error fetching members", error: err });
  }
}


module.exports = {
  fetchRowMember,
  fetchfavmovies,
  fetchSingleMember,
  fetchbyrev
 };