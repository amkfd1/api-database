const express = require("express");
const router = express.Router();
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');
const MoviesController = require('../controllers/movies');

// const storage = multer.diskStorage({
//   destination: function(req, file, cb) {
//     cb(null, './uploads/');
//   },
//   filename: function(req, file, cb) {
//     cb(null, new Date().toISOString() + file.originalname);
//   }
// });

// const fileFilter = (req, file, cb) => {
//   // reject a file
//   if (file.mimetype === 'video/mp4' || file.mimetype === 'video/mkv' || file.mimetype === 'video/webm') {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };

// const upload = multer({
//   storage: storage,
//   limits: {
//     fileSize: 1024 * 1024 * 5
//   },
//   fileFilter: fileFilter
// });

// Handle GET requests
router.get("/", MoviesController.movie_get_all);

router.get("/genre/:genre", MoviesController.movie_get_genre);

router.get("/year/:year", MoviesController.movie_get_year);

router.get("/:movieId", MoviesController.movie_get_movie);

// Handle POST requests
router.post("/", MoviesController.movie_create_movie);


// Handle PATCH requests
router.patch("/:movieId", checkAuth, MoviesController.movie_update_movie);

// Handle DELETE requests
router.delete("/:movieId", checkAuth, MoviesController.movie_delete);

module.exports = router;
