const express = require("express");
const router = express.Router();
const movieController = require("../controllers/MembersController");

router.get("/members", movieController.fetchRowMember);
// http://localhost:3001/api/members


module.exports = router;