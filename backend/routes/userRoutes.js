const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");

router.get("/checklogin", UserController.getLoginUserID);
//http://localhost:3001/api/checklogin
router.get("/username", UserController.fetchUserInfo);
// http://localhost:3001/api/username?id=103
router.post('/addUser', UserController.postUser);
module.exports = router;
