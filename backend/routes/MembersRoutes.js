const express = require("express");
const router = express.Router();
const movieController = require("../controllers/MembersController");

router.get("/members", movieController.fetchRowMember);
// http://localhost:3001/api/members
router.get("/userfavmovies", movieController.fetchfavmovies);
// http://localhost:3001/api/userfavmovies?id=83
router.get("/userrecentmovies", movieController.fetchrecentmovies);
// http://localhost:3001/api/userrecentmovies?id=83
router.get("/singlemember", movieController.fetchSingleMember);
// http://localhost:3001/api/singlemember?id=83


module.exports = router;