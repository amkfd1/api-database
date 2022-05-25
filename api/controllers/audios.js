const mongoose = require("mongoose");
const Audio = require("../models/audio");
/**
 * Handler that displays all the available movies
 * @param req
 * @param res
 * @param next
 */
 exports.audio_get_all = (req, res, next) => {
    Audio.find()
      .select('Audio')
      .exec()
      .then(docs => {
        const response = {
          count: docs.length,
          Audios: docs.map(doc => {
            return {
              title: doc.title,
              genre: doc.genre,
              descr: doc.descr,
              year: doc.year,
              link: doc.link,
              _id: doc._id,
              request: {
                type: "GET",
                url: "http://localhost:3000/movies/" + doc._id
              }
            };
          })
        };
        //   if (docs.length >= 0) {
        res.status(200).json(response);
        //   } else {
        //       res.status(404).json({
        //           message: 'No entries found'
        //       });
        //   }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  };


  /**
 * Handler that displays the available movies based on their genre
 * @param req
 * @param res
 * @param next
 */
exports.audio_get_genre = (req, res, next) => {
  const genre = req.params.genre;
  Audio.find({"genre": genre})
      .select("_id title genre descr year")
      .exec()
      .then(doc => {
        console.log("From database", doc);
        if (doc) {
          res.status(200).json({
            movie: doc,
            request: {
              type: "GET",
              url: "http://localhost:3000/audios"
            }
          });
        } else {
          res
              .status(404)
              .json({ message: "No valid entry found for provided ID" });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
      });
};


///////////////////////////////////////////////////////
const multer = require('multer');
const uploads = multer({dest: '/uploads/'});

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

/**
 * Handler that creates a new movie title by a POST request with a body
 * @param req
 * @param res
 * @param next
 */
 exports.audio_create_audio = (req, res, next) => {
    const audio = new Audio({
      _id: new mongoose.Types.ObjectId(),
      title: req.body.title,
      genre: req.body.genre,
      descr: req.body.descr,
      year: req.body.year,
      link: req.file
    });
    audio
      .save()
      .then(result => {
        console.log(result);
        res.status(201).json({
          message: "Created audio file successfully",
          createdAudio: {
            title: result.title,
            genre: result.genre,
            descr: result.descr,
            year: result.year,
            link: result.link,
            _id: result._id,
            request: {
              type: "GET",
              url: "http://localhost:3000/audios/" + result._id
            }
          }
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  };
  