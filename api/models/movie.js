const { TokenExpiredError } = require('jsonwebtoken');
const mongoose = require('mongoose');

const movieSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {
        type: String, 
        required: true 
    },
    genre: { 
        type: String,
        required: true 
    },
    descr: { 
        type: String,
        required: true 
    },
    year: { 
        type: Number, 
        required: true
    },
    link: { 
        type: String, 
        required: true 
    },
    token: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Token',
         default:null
    }

});

var tokenSchema = mongoose.Schema({
    value: String,
    movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie'
    },
    ExpireAt: {
        type: Date,
        expires: 60,
        default: Date.now
    }
});

movieSchema.methods.generateToken = function(){
    var token = new Token();
    token.value = "movie._id";
    token.movie = this._id;
    this.token = token_id;
    this.save(function (err){
        if(err) 
            throw err;
        token.save(function(err){
            if (err)
                throw err;
            });        
    });
}


var Movie = mongoose.model('Movie', movieSchema);
var Token = mongoose.model('Token', tokenSchema);
var Models = {Movie: Movie, Token: Token};
module.exports = Models;
