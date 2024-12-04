const express = require("express");
const router = express.Router();
const movieController = require("../controllers/MembersController");

router.get("/members", movieController.fetchRowMember);
// http://localhost:3001/api/members
router.get("/favmovies", movieController.fetchfavmovies);
// http://localhost:3001/api/favmovies
router.get("/recentrev", movieController.fetchbyrev);
// http://localhost:3001/api/recentrev
router.get("/singlemember", movieController.fetchSingleMember);
// http://localhost:3001/api/singlemember?id=83


module.exports = router;