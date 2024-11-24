/**
 * Controller for movie-related operations
 */
const {
  List_Row_Members
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

module.exports = {
  fetchRowMember
 };