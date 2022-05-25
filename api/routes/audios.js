const express = require("express");
const router = express.Router();
const multer = require('multer');
const uploads = multer({dest: '/uploads/'});
const audiofile = uploads.single('Audio File');
// const multer = require('multer');
// const checkAuth = require('../middleware/check-auth');
const AudioController = require('../controllers/audios');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'audio/mp3' || file.mimetype === 'audio/wav') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

// Handle GET requests
router.get("/", AudioController.audio_get_all);

// router.get("/genre/:genre", AudioController.audio_get_genre);

// router.get("/year/:year", AudioController.audio_get_year);

// router.get("/:audioId", AudioController.audio_get_audio);

// Handle POST requests
router.post("/", AudioController.audio_create_audio);


// // Handle PATCH requests
// router.patch("/:audioId", checkAuth, AudiController.audio_update_audio);

// // Handle DELETE requests
// router.delete("/:audioId", checkAuth, AudioController.audio_delete);

module.exports = router;
