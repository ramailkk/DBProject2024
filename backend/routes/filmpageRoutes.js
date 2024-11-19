const express = require("express");
const router = express.Router();
const movieController = require("../controllers/filmpageController");

router.get("/filmpagegenres", movieController.fetchGenresByMovie);
// http://localhost:3001/api/filmpagegenres?id=1
router.get("/filmpageactors", movieController.fetchActorsByMovie);
// http://localhost:3001/api/filmpageactors?id=1
router.get("/filmpagedirectors", movieController.fetchDirectorsByMovie);
// http://localhost:3001/api/filmpagedirectors?id=1


module.exports = router;