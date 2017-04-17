var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bookModel = new Schema({
    // TODO err if use string instead of String
    title: {
        type: String
    },
    author: {
        type: String
    },
    genre: {
        type: String
    },
    read: {
        type: Boolean,
        default: false
    }
});

// load this model into mongoose
module.exports = mongoose.model('Book', bookModel);
