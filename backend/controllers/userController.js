/**
 * Controller for movie-related operations
 */
const {
  checkLogin,
  getUserInfo,
  addNewUser
} = require("../models/UserModel");

  const db = require("../config/db");
//   async function fetchAllUsers(req, res) {
//     try {
//       // get all employees
//     const  users = await getAllUsers();
//       // send response with movies in json
//     res.json({ data: users });
//     } catch (err) {
//     res.status(500).json({ message: "Error fetching users", error: err });
//     }
//   }
  async function postUser(req, res) {
    try {
      // Validate request body against the database schema requirements
      const UserData = req.body;
      console.log(UserData)
      // Call model function to add new passenger to the database
      await addNewUser(UserData);
      res.status(201).json({ message: "User added successfully" });
    } catch (err) {
      res.status(500).json({ message: "Error adding User", error: err });
    }
  }
async function getLoginUserID(req, res) {
  try {
    const username = req.query.username;
    const password = req.query.password;
    // get all employees
  const  user = await checkLogin(username,password);
    // send response with movies in json
  res.json(user);
  } catch (err) {
  res.status(500).json({ message: "Error fetching users", error: err });
  }
}
async function fetchUserInfo(req, res) {
  try {
    const userID= req.query.id;
    // get all employees
  const  user = await getUserInfo(userID);
    // send response with movies in json
  res.json({data : user});
  } catch (err) {
  res.status(500).json({ message: "Error fetching users", error: err });
  }
}

module.exports = {
  getLoginUserID,
  fetchUserInfo,
  postUser
};

