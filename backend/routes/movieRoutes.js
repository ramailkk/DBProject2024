const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movieController");


router.get("/infolist", movieController.fetchUserListInfo);
//http://localhost:3001/api/infolist?id=3&listID=1
router.get("/inforeview", movieController.fetchUserReviewInfo);
//http://localhost:3001/api/InfoReview
router.get("/movies", movieController.getAllmovies);
//http://localhost:3001/api/movies
router.get("/genres", movieController.getAllgenres);
// //http://localhost:3001//api/genres
router.get("/moviegenre",movieController.fetchMoviesByGenre);
// http://localhost:3001/api/moviegenre?id=1
router.get("/moviedecade", movieController.getMoviesByDecade);
//  http://localhost:3001/api/moviedecade?decade=1990
router.get("/moviename", movieController.getMoviesByNameHandler);
// http://localhost:3001/api/moviename?name=dark
router.get('/movierating', movieController.getMoviesByRatingRange);
//http://localhost:3001/api/movierating?rating=6
router.post('/updateSelectedMember', movieController.updateSelectedMember);

module.exports = router;