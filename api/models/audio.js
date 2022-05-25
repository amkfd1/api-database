const mongoose = require('mongoose');
const audioSchema = mongoose.Schema({
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


module.exports = mongoose.model('Audio', audioSchema);
